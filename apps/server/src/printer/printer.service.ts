import { HttpService } from "@nestjs/axios";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fontkit from "@pdf-lib/fontkit";
import { ResumeDto } from "@reactive-resume/dto";
import { getFontUrls, pageSizeMap, withTimeout } from "@reactive-resume/utils";
import retry from "async-retry";
import { readFile } from "fs/promises";
import { join } from "path";
import { PDFDocument } from "pdf-lib";
import { connect } from "puppeteer";

import { Config } from "../config/schema";
import { ErrorMessage } from "../constants/error-message";
import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

const MM_TO_PX = 3.78;
const PREVIEW_TIMEOUT = 5000; // 5 seconds
const PRINTER_TIMEOUT = 10000; // 10 seconds

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  private browserEndpoint: string;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly storageService: StorageService,
    private readonly httpService: HttpService,
    private readonly utils: UtilsService,
  ) {
    const chromeUrl = this.configService.getOrThrow<string>("CHROME_URL");
    const chromeToken = this.configService.getOrThrow<string>("CHROME_TOKEN");

    this.browserEndpoint = `${chromeUrl}?token=${chromeToken}`;
  }

  private getBrowser() {
    try {
      return connect({ browserWSEndpoint: this.browserEndpoint });
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessage.InvalidBrowserConnection, error.message);
    }
  }

  async getVersion() {
    const browser = await this.getBrowser();
    const version = await browser.version();
    browser.disconnect();
    return version;
  }

  async printResume(resume: ResumeDto) {
    return this.utils.getCachedOrSet(
      `user:${resume.userId}:storage:resumes:${resume.id}`,
      async () => {
        const start = performance.now();

        const url = await retry(() => withTimeout(this.generateResume(resume), PRINTER_TIMEOUT), {
          retries: 3,
          randomize: true,
          onRetry: (_, attempt) => {
            this.logger.debug(`Retrying resume print job: Attempt #${attempt}`);
          },
        });

        const duration = Number(performance.now() - start).toFixed(0);
        const numPages = resume.data.metadata.layout.length;

        this.logger.debug(`Chrome took ${duration}ms to print ${numPages} page(s)`);

        return url;
      },
    );
  }

  async printPreview(resume: ResumeDto) {
    return this.utils.getCachedOrSet(
      `user:${resume.userId}:storage:previews:${resume.id}`,
      async () => {
        return withTimeout(this.generatePreview(resume), PREVIEW_TIMEOUT);
      },
    );
  }

  async generateResume(resume: ResumeDto) {
    const browser = await this.getBrowser();

    const page = await browser.newPage();

    let url = this.utils.getUrl();
    const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
    const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

    if ([publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
      // Switch client URL from `localhost` to `host.docker.internal` in development
      // This is required because the browser is running in a container and the client is running on the host machine.
      url = url.replace("localhost", "host.docker.internal");

      await page.setRequestInterception(true);

      // Intercept requests of `localhost` to `host.docker.internal` in development
      page.on("request", (request) => {
        if (request.url().startsWith(storageUrl)) {
          const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);

          request.continue({ url: modifiedUrl });
        } else {
          request.continue();
        }
      });
    }

    // Set the data of the resume to be printed in the browser's session storage
    const format = resume.data.metadata.page.format;
    const numPages = resume.data.metadata.layout.length;

    await page.evaluateOnNewDocument((data: string) => {
      sessionStorage.setItem("resume", data);
    }, JSON.stringify(resume.data));

    await page.goto(`${url}/printer`, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");

    const pagesBuffer: Buffer[] = [];

    // Hide all the pages (elements with [data-page] attribute) using CSS
    const hidePages = () => {
      return page.$eval("iframe", (frame) => {
        frame.contentDocument?.documentElement.querySelectorAll("[data-page]").forEach((page) => {
          page.setAttribute("style", "display: none");
        });
      });
    };

    const processPage = (index: number) => {
      // Calculate the height of the page based on the format, convert mm to pixels
      const pageSize = {
        width: pageSizeMap[format].width * MM_TO_PX,
        height: pageSizeMap[format].height * MM_TO_PX,
      };

      return page.$eval(
        "iframe",
        (frame, index, pageSize) => {
          const page = frame.contentDocument?.querySelector(`[data-page="${index}"]`);
          page?.setAttribute("style", "display: block");

          return {
            width: Math.max(pageSize.width, page?.scrollWidth ?? 0),
            height: Math.max(pageSize.height, page?.scrollHeight ?? 0),
          };
        },
        index,
        pageSize,
      );
    };

    // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
    for (let index = 1; index <= numPages; index++) {
      await hidePages();

      const { width, height } = await processPage(index);
      const buffer = await page.pdf({ width, height });
      pagesBuffer.push(buffer);

      await hidePages();
    }

    // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);

    // Get information about fonts used in the resume from the metadata
    const fontData = resume.data.metadata.typography.font;

    // Handle Special Case for CMU Serif as it is not available on Google Fonts
    if (fontData.family === "CMU Serif") {
      const fontsBuffer = await Promise.all([
        readFile(join(__dirname, "assets/fonts/computer-modern/regular.ttf")),
        readFile(join(__dirname, "assets/fonts/computer-modern/italic.ttf")),
        readFile(join(__dirname, "assets/fonts/computer-modern/bold.ttf")),
      ]);

      await Promise.all(
        fontsBuffer.map((buffer) => {
          // Convert Buffer to ArrayBuffer
          const arrayBuffer = buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength,
          );
          return pdf.embedFont(arrayBuffer);
        }),
      );
    } else {
      const fontUrls = getFontUrls(fontData.family, fontData.variants);

      // Load all the fonts from the URLs using HttpService
      const responses = await Promise.all(
        fontUrls.map((url) =>
          this.httpService.axiosRef.get(url, {
            responseType: "arraybuffer",
          }),
        ),
      );
      const fontsBuffer = responses.map((response) => response.data as ArrayBuffer);

      // Embed all the fonts in the PDF
      await Promise.all(fontsBuffer.map((buffer) => pdf.embedFont(buffer)));
    }

    for (let index = 0; index < pagesBuffer.length; index++) {
      const page = await PDFDocument.load(pagesBuffer[index]);
      const copiedPage = await pdf.copyPages(page, [0]);
      pdf.addPage(copiedPage[0]);
    }

    // Save the PDF to storage and return the URL to download the resume
    // Store the URL in cache for future requests, under the previously generated hash digest
    const buffer = Buffer.from(await pdf.save());

    // This step will also save the resume URL in cache
    const resumeUrl = await this.storageService.uploadObject(
      resume.userId,
      "resumes",
      buffer,
      resume.id,
    );

    // Close all the pages and disconnect from the browser
    await page.close();
    browser.disconnect();

    return resumeUrl;
  }

  async generatePreview(resume: ResumeDto) {
    const browser = await this.getBrowser();

    const page = await browser.newPage();

    let url = this.utils.getUrl();
    const publicUrl = this.configService.getOrThrow<string>("PUBLIC_URL");
    const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");

    if ([publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
      // Switch client URL from `localhost` to `host.docker.internal` in development
      // This is required because the browser is running in a container and the client is running on the host machine.
      url = url.replace("localhost", "host.docker.internal");

      await page.setRequestInterception(true);

      // Intercept requests of `localhost` to `host.docker.internal` in development
      page.on("request", (request) => {
        if (request.url().startsWith(storageUrl)) {
          const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);

          request.continue({ url: modifiedUrl });
        } else {
          request.continue();
        }
      });
    }

    // Set the data of the resume to be printed in the browser's session storage
    const format = resume.data.metadata.page.format;

    await page.evaluateOnNewDocument((data: string) => {
      sessionStorage.setItem("resume", data);
    }, JSON.stringify(resume.data));

    await page.setViewport({
      width: Math.round(pageSizeMap[format].width * MM_TO_PX),
      height: Math.round(pageSizeMap[format].height * MM_TO_PX),
    });

    await page.goto(`${url}/printer`, { waitUntil: "networkidle0" });

    // Save the JPEG to storage and return the URL
    // Store the URL in cache for future requests, under the previously generated hash digest
    const buffer = await page.screenshot({ quality: 80, type: "jpeg" });

    // Generate a hash digest of the resume data, this hash will be used to check if the resume has been updated
    const previewUrl = await this.storageService.uploadObject(
      resume.userId,
      "previews",
      buffer,
      resume.id,
    );

    // Close all the pages and disconnect from the browser
    await page.close();
    browser.disconnect();

    return previewUrl;
  }
}
