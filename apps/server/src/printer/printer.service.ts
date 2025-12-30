import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ResumeDto } from "@reactive-resume/dto";
import { ErrorMessage, MM_TO_PX, pageSizeMap } from "@reactive-resume/utils";
import retry from "async-retry";
import { PDFDocument } from "pdf-lib";
import { connect } from "puppeteer-core";

import { Config } from "../config/schema";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  private readonly browserURL: string;

  private readonly ignoreHTTPSErrors: boolean;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly storageService: StorageService,
    private readonly httpService: HttpService,
  ) {
    const chromeUrl = this.configService.getOrThrow<string>("CHROME_URL");
    const chromeToken = this.configService.getOrThrow<string>("CHROME_TOKEN");

    this.browserURL = `${chromeUrl}?token=${chromeToken}`;
    this.ignoreHTTPSErrors = this.configService.getOrThrow<boolean>("CHROME_IGNORE_HTTPS_ERRORS");
  }

  private async getBrowser() {
    try {
      return await connect({
        browserWSEndpoint: this.browserURL,
        acceptInsecureCerts: this.ignoreHTTPSErrors,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        ErrorMessage.InvalidBrowserConnection,
        (error as Error).message,
      );
    }
  }

  async getVersion() {
    const browser = await this.getBrowser();
    const version = await browser.version();
    await browser.disconnect();
    return version;
  }

  async printResume(resume: ResumeDto) {
    const start = performance.now();

    const url = await retry<string | undefined>(() => this.generateResume(resume), {
      retries: 3,
      randomize: true,
      onRetry: (_, attempt) => {
        this.logger.log(`Retrying to print resume #${resume.id}, attempt #${attempt}`);
      },
    });

    const duration = +(performance.now() - start).toFixed(0);
    const numberPages = resume.data.metadata.layout.length;

    this.logger.debug(`Chrome took ${duration}ms to print ${numberPages} page(s)`);

    return url;
  }

  async printPreview(resume: ResumeDto) {
    const start = performance.now();

    const url = await retry(() => this.generatePreview(resume), {
      retries: 3,
      randomize: true,
      onRetry: (_, attempt) => {
        this.logger.log(
          `Retrying to generate preview of resume #${resume.id}, attempt #${attempt}`,
        );
      },
    });

    const duration = +(performance.now() - start).toFixed(0);

    this.logger.debug(`Chrome took ${duration}ms to generate preview`);

    return url;
  }

  async generateResume(resume: ResumeDto) {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();

      const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
      const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

      let url = publicUrl;

      if ([publicUrl, storageUrl].some((url) => /https?:\/\/localhost(:\d+)?/.test(url))) {
        // Switch client URL from `http[s]://localhost[:port]` to `http[s]://host.docker.internal[:port]` in development
        // This is required because the browser is running in a container and the client is running on the host machine.
        url = url.replace(
          /localhost(:\d+)?/,
          (_match, port) => `host.docker.internal${port ?? ""}`,
        );

        await page.setRequestInterception(true);

        // Intercept requests of `localhost` to `host.docker.internal` in development
        page.on("request", (request) => {
          if (request.url().startsWith(storageUrl)) {
            const modifiedUrl = request
              .url()
              .replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port ?? ""}`);

            void request.continue({ url: modifiedUrl });
          } else {
            void request.continue();
          }
        });
      }

      // Set the data of the resume to be printed in the browser's session storage
      const format = resume.data.metadata.page.format;
      const shouldPaginatePdf = resume.data.metadata.page.options.paginate;

      await page.goto(`${url}/artboard/preview`, { waitUntil: "domcontentloaded" });

      await page.evaluate((data) => {
        window.localStorage.setItem("resume", JSON.stringify(data));
      }, resume.data);

      await Promise.all([
        page.reload({ waitUntil: "load" }),
        // Wait until first page is present before proceeding
        page.waitForSelector('[data-page="1"]', { timeout: 15_000 }),
      ]);

      await page.evaluate(() => document.fonts.ready);
      // eslint-disable-next-line unicorn/prefer-spread
      await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete));

      const pagesBuffer: Buffer[] = [];

      const printPageHeight = Math.ceil(MM_TO_PX * pageSizeMap[format].height);
      const printPageWidth = Math.ceil(MM_TO_PX * pageSizeMap[format].width);

      // Loop through all the pages and print them by slicing the long page into fixed-height chunks
      const processPages = async () => {
        const pageElement = await page.$(`[data-page="1"]`);
        // eslint-disable-next-line unicorn/no-await-expression-member
        const height = (await (await pageElement?.getProperty("scrollHeight"))?.jsonValue()) ?? 0;

        const numberOfPages = Math.ceil(height / printPageHeight);
        for (let index = 1; index <= numberOfPages; index++) {
          const offset = (index - 1) * printPageHeight;

          const temporaryHtml = await page.evaluate(
            (
              element: HTMLDivElement,
              offset_: number,
              printPageHeight_: number,
              printPageWidth_: number,
            ) => {
              const originalHtml = document.body.innerHTML;

              const clonedElement = element.cloneNode(true) as HTMLDivElement;

              const wrapper = document.createElement("div");
              wrapper.id = "__clip-wrapper";
              wrapper.style.width = `${printPageWidth_}px`;
              wrapper.style.height = `${printPageHeight_}px`;
              wrapper.style.overflow = "hidden";

              const container = document.createElement("div");
              container.id = "__clip-container";
              container.style.transform = `translateY(-${offset_}px)`;
              container.append(clonedElement);

              wrapper.append(container);

              document.body.innerHTML = "";
              document.body.append(wrapper);

              return originalHtml;
            },
            pageElement,
            offset,
            printPageHeight,
            printPageWidth,
          );

          // Apply custom CSS, if enabled
          const css = resume.data.metadata.css;

          if (css.visible) {
            await page.evaluate((cssValue: string) => {
              const styleTag = document.createElement("style");
              styleTag.textContent = cssValue;
              document.head.append(styleTag);
            }, css.value);
          }

          await page.setViewport({ width: printPageWidth, height: printPageHeight });

          const uint8array = await page.pdf({
            width: `${printPageWidth}px`,
            height: `${printPageHeight}px`,
            margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
            printBackground: true,
            preferCSSPageSize: true,
          });

          const buffer = Buffer.from(uint8array);
          pagesBuffer.push(buffer);

          await page.evaluate((originalHtml: string) => {
            document.body.innerHTML = originalHtml;
          }, temporaryHtml);
        }
      };

      const processSinglePagePdf = async () => {
        const pageElement = await page.$(`[data-page="1"]`);
        const fullHeight =
          // eslint-disable-next-line unicorn/no-await-expression-member
          (await (await pageElement?.getProperty("scrollHeight"))?.jsonValue()) ?? 0;

        await page.setViewport({ width: printPageWidth, height: Math.ceil(fullHeight) });

        const uint8array = await page.pdf({
          width: `${printPageWidth}px`,
          height: `${Math.ceil(fullHeight)}px`,
          margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
          printBackground: true,
          preferCSSPageSize: true,
        });

        pagesBuffer.push(Buffer.from(uint8array));
      };

      await (shouldPaginatePdf ? processPages() : processSinglePagePdf());

      // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
      const pdf = await PDFDocument.create();

      for (const element of pagesBuffer) {
        const page = await PDFDocument.load(element);
        const [copiedPage] = await pdf.copyPages(page, [0]);
        pdf.addPage(copiedPage);
      }

      // Save the PDF to storage and return the URL to download the resume
      // Store the URL in cache for future requests, under the previously generated hash digest
      const buffer = Buffer.from(await pdf.save());

      // This step will also save the resume URL in cache
      const resumeUrl = await this.storageService.uploadObject(
        resume.userId,
        "resumes",
        buffer,
        resume.title,
      );

      // Close all the pages and disconnect from the browser
      await page.close();
      await browser.disconnect();

      return resumeUrl;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(
        ErrorMessage.ResumePrinterError,
        (error as Error).message,
      );
    }
  }

  async generatePreview(resume: ResumeDto) {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
    const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

    let url = publicUrl;

    if ([publicUrl, storageUrl].some((url) => /https?:\/\/localhost(:\d+)?/.test(url))) {
      // Switch client URL from `http[s]://localhost[:port]` to `http[s]://host.docker.internal[:port]` in development
      // This is required because the browser is running in a container and the client is running on the host machine.
      url = url.replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port ?? ""}`);

      await page.setRequestInterception(true);

      // Intercept requests of `localhost` to `host.docker.internal` in development
      page.on("request", (request) => {
        if (request.url().startsWith(storageUrl)) {
          const modifiedUrl = request
            .url()
            .replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port ?? ""}`);

          void request.continue({ url: modifiedUrl });
        } else {
          void request.continue();
        }
      });
    }

    // Set the data of the resume to be printed in the browser's session storage
    await page.evaluateOnNewDocument((data) => {
      window.localStorage.setItem("resume", JSON.stringify(data));
    }, resume.data);

    await page.setViewport({ width: 794, height: 1123 });

    await page.goto(`${url}/artboard/preview`, { waitUntil: "networkidle0" });

    // Save the JPEG to storage and return the URL
    // Store the URL in cache for future requests, under the previously generated hash digest
    const uint8array = await page.screenshot({ quality: 80, type: "jpeg" });
    const buffer = Buffer.from(uint8array);

    // Generate a hash digest of the resume data, this hash will be used to check if the resume has been updated
    const previewUrl = await this.storageService.uploadObject(
      resume.userId,
      "previews",
      buffer,
      resume.id,
    );

    // Close all the pages and disconnect from the browser
    await page.close();
    await browser.disconnect();

    return previewUrl;
  }
}
