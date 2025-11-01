import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ResumeDto } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import retry from "async-retry";
import { PDFDocument } from "pdf-lib";
import { connect } from "puppeteer";
import HtmlToDocx from "@turbodocx/html-to-docx";

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

  async buildResumeHtml(resume: ResumeDto): Promise<string> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
    const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

    let url = publicUrl;

    if ([publicUrl, storageUrl].some((u) => /https?:\/\/localhost(:\d+)?/.test(u))) {
      url = url.replace(/localhost(:\d+)?/, (_match, port) => `host.docker.internal${port ?? ""}`);

      await page.setRequestInterception(true);

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

    await page.goto(`${url}/artboard/preview`, { waitUntil: "domcontentloaded" });
    await page.evaluate((data) => {
      window.localStorage.setItem("resume", JSON.stringify(data));
    }, resume.data);

    await Promise.all([
      page.reload({ waitUntil: "load" }),
      page.waitForSelector('[data-page="1"]', { timeout: 15_000 }),
    ]);

    const numberPages = resume.data.metadata.layout.length;

    const inDocumentStyles = await page.evaluate(() =>
      Array.from(document.querySelectorAll("style"))
        .map((s) => s.textContent ?? "")
        .join("\n"),
    );

    // Also collect any linked stylesheets and inline them, so downstream
    // converters (Docx/Google Docs) have the full CSS available.
    const linkedStyles = await page.evaluate(async () => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
      const texts = await Promise.all(
        links.map(async (link) => {
          try {
            const res = await fetch(link.href);
            return await res.text();
          } catch {
            return "";
          }
        }),
      );
      return texts.join("\n");
    });

    // Capture runtime CSS variables and root font settings applied by the artboard
    const rootRuntimeStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const vars = [
        "--margin",
        "--font-size",
        "--line-height",
        "--color-foreground",
        "--color-primary",
        "--color-background",
      ];

      const lines = [
        `font-size: ${computed.getPropertyValue("font-size")}`,
        `line-height: ${computed.getPropertyValue("line-height")}`,
        ...vars.map((v) => `${v}: ${computed.getPropertyValue(v)}`),
      ];

      return `:root{${lines.join("; ")}}`;
    });

    const baseStyles = [inDocumentStyles, linkedStyles, rootRuntimeStyles]
      .filter(Boolean)
      .join("\n");
    const css = resume.data.metadata.css;
    let combinedStyles = css?.visible && css?.value ? `${baseStyles}\n${css.value}` : baseStyles;

    // Best-effort resolve CSS custom properties used by Tailwind config
    // since some converters (Docx/GDocs) have limited support for CSS vars.
    const varValues = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const keys = [
        "--margin",
        "--font-size",
        "--line-height",
        "--color-foreground",
        "--color-primary",
        "--color-background",
      ];
      return Object.fromEntries(keys.map((k) => [k, computed.getPropertyValue(k).trim()]));
    });

    const replaceVar = (cssText: string, name: string, value?: string) =>
      value ? cssText.replace(new RegExp(`var\\(\\s*${name}\\s*\\)`, "g"), value) : cssText;

    combinedStyles = replaceVar(combinedStyles, "--margin", varValues["--margin"]);
    combinedStyles = replaceVar(combinedStyles, "--font-size", varValues["--font-size"]);
    combinedStyles = replaceVar(combinedStyles, "--line-height", varValues["--line-height"]);
    combinedStyles = replaceVar(combinedStyles, "--color-foreground", varValues["--color-foreground"]);
    combinedStyles = replaceVar(combinedStyles, "--color-primary", varValues["--color-primary"]);
    combinedStyles = replaceVar(combinedStyles, "--color-background", varValues["--color-background"]);

    const pagesHtml: string[] = [];
    for (let index = 1; index <= numberPages; index++) {
      const pageElement = await page.$(`[data-page="${index}"]`);
      const html = await page.evaluate((el: HTMLDivElement) => el.outerHTML, pageElement);
      pagesHtml.push(html);
    }

    await page.close();
    await browser.disconnect();

    const docHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${combinedStyles}</style></head><body>` +
      pagesHtml.join('<div style="page-break-before: always"></div>') +
      `</body></html>`;

    return docHtml;
  }

  async exportDocx(resume: ResumeDto) {
    try {
      const docHtml = await this.buildResumeHtml(resume);

      const arrayBuffer = await HtmlToDocx(docHtml, null, {
        pageNumber: false,
      });

      return Buffer.from(arrayBuffer as ArrayBuffer);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ErrorMessage.ResumePrinterError,
        (error as Error).message,
      );
    }
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
      const numberPages = resume.data.metadata.layout.length;

      await page.goto(`${url}/artboard/preview`, { waitUntil: "domcontentloaded" });

      await page.evaluate((data) => {
        window.localStorage.setItem("resume", JSON.stringify(data));
      }, resume.data);

      await Promise.all([
        page.reload({ waitUntil: "load" }),
        // Wait until first page is present before proceeding
        page.waitForSelector('[data-page="1"]', { timeout: 15_000 }),
      ]);

      const pagesBuffer: Buffer[] = [];

      const processPage = async (index: number) => {
        const pageElement = await page.$(`[data-page="${index}"]`);
        // eslint-disable-next-line unicorn/no-await-expression-member
        const width = (await (await pageElement?.getProperty("scrollWidth"))?.jsonValue()) ?? 0;
        // eslint-disable-next-line unicorn/no-await-expression-member
        const height = (await (await pageElement?.getProperty("scrollHeight"))?.jsonValue()) ?? 0;

        const temporaryHtml = await page.evaluate((element: HTMLDivElement) => {
          const clonedElement = element.cloneNode(true) as HTMLDivElement;
          const temporaryHtml_ = document.body.innerHTML;
          document.body.innerHTML = clonedElement.outerHTML;
          return temporaryHtml_;
        }, pageElement);

        // Apply custom CSS, if enabled
        const css = resume.data.metadata.css;

        if (css.visible) {
          await page.evaluate((cssValue: string) => {
            const styleTag = document.createElement("style");
            styleTag.textContent = cssValue;
            document.head.append(styleTag);
          }, css.value);
        }

        const uint8array = await page.pdf({ width, height, printBackground: true });
        const buffer = Buffer.from(uint8array);
        pagesBuffer.push(buffer);

        await page.evaluate((temporaryHtml_: string) => {
          document.body.innerHTML = temporaryHtml_;
        }, temporaryHtml);
      };

      // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
      for (let index = 1; index <= numberPages; index++) {
        await processPage(index);
      }

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
