import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { access, mkdir, readdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import { BrowserContext, chromium } from 'playwright-chromium';
import { PageConfig } from 'schema';
import { OrderService } from 'src/orders/order.service';

const minimal_chromium_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

@Injectable()
export class PrinterService implements OnModuleInit, OnModuleDestroy {
  private browser: BrowserContext;

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly orderService: OrderService,
  ) {}

  async onModuleInit() {
    this.browser = await chromium.launchPersistentContext('.playwright', {
      headless: true,
      forcedColors: 'active',
      args: minimal_chromium_args,
    });
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  // async addWatermarkToPdf(pdfDoc, watermarkText) {
  //   // Load the existing PDF buffer
  //   // const pdfDoc = await PDFDocument.load(pdfBuffer);

  //   // Get the number of pages in the PDF
  //   const pageCount = pdfDoc.getPageCount();

  //   // Create a watermark text
  //   const watermark = pdfDoc.embedFont('Helvetica');
  //   const watermarkSize = 50;
  //   const watermarkColor = rgb(0.5, 0.5, 0.5);

  //   for (let i = 0; i < pageCount; i++) {
  //     const page = pdfDoc.getPage(i);
  //     const { width, height } = page.getSize();

  //     // Calculate the position for the watermark (e.g., centered)
  //     const textWidth = watermarkText.length * watermarkSize * 0.6;
  //     const x = (width - textWidth) / 2;
  //     const y = (height - watermarkSize) / 2;

  //     page.drawText(watermarkText).at(x, y).withFont(watermark).withSize(watermarkSize).withColor(watermarkColor);
  //   }

  //   // Serialize the PDF to a buffer
  //   const modifiedPdfBuffer = await pdfDoc.save();

  //   return modifiedPdfBuffer;
  // }

  // Usage
  // const inputPdfPath = 'input.pdf';
  // const watermarkText = 'CONFIDENTIAL';

  // fs.readFile(inputPdfPath)
  //   .then((pdfBuffer) => addWatermarkToPdf(pdfBuffer, watermarkText))
  //   .then((outputPdfBuffer) => fs.writeFile('output.pdf', outputPdfBuffer))
  //   .catch((error) => console.error(error));

  async printAsPdf(username: string, slug: string, lastUpdated: string, preview: boolean): Promise<string> {
    const serverUrl = this.configService.get('app.serverUrl');
    const order = await this.orderService.findOne(username);

    if (order === null && (preview === false || preview === undefined || preview === null)) {
      const publicUrl = JSON.stringify({
        message: 'No payment found for this resume,kindly pay KSh 50 in order to buy your resume.',
        status: '412',
      });
      return publicUrl;
    }
    const directory = join(__dirname, '..', 'assets/exports');
    const filename = `CVpap_${username}_${slug}_${lastUpdated}.pdf`;
    const publicUrl = `${serverUrl}/assets/exports/${filename}`;

    try {
      if (order !== null) {
        await access(join(directory, filename));
      }
    } catch {
      const activeSchedulerTimeouts = this.schedulerRegistry.getTimeouts();

      await readdir(directory).then(async (files) => {
        await Promise.all(
          files.map(async (file) => {
            if (file.startsWith(`CVpap_${username}_${slug}`)) {
              await unlink(join(directory, file));
              if (activeSchedulerTimeouts[`delete-${file}`]) {
                this.schedulerRegistry.deleteTimeout(`delete-${file}`);
              }
            }
          }),
        );
      });

      const url = this.configService.get('app.url');
      const secretKey = this.configService.get('app.secretKey');
      const pdfDeletionTime = this.configService.get<number>('cache.pdfDeletionTime');

      const page = await this.browser.newPage();

      await page.goto(`${url}/${username}/${slug}/printer?secretKey=${secretKey}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('html.wf-active', { state: 'visible' });

      const pageFormat: PageConfig['format'] = await page.$$eval(
        '[data-page]',
        (pages) => pages[0].getAttribute('data-format') as PageConfig['format'],
      );

      const resumePages = await page.$$eval('[data-page]', (pages) =>
        pages.map((page, index) => ({
          pageNumber: index + 1,
          innerHTML: page.innerHTML,
          height: page.clientHeight,
        })),
      );

      const pdf = await PDFDocument.create();

      for (let index = 0; index < resumePages.length; index++) {
        if (preview === true) {
          await page.evaluate((page) => {
            document.body.innerHTML = page.innerHTML;

            const selector = 'body';
            const newDiv = document.createElement('div');
            const newStart = document.createElement('div');
            const newEnd = document.createElement('div');
            newDiv.innerHTML = `<div style='
          background: #d3d3d344;
          color: #ff000044;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          font-size: 50px;
          z-index: 99999;
          position: fixed;
          width: 500px;
          height: 500px;
          left: 50%;  /* Horizontally center the div */
          top: 50%;   /* Vertically center the div */
          transform: translate(-50%, -50%); /* Move the div back by half its width and height */
      '>
        CVPAP<br>
          <small style="font-size: 10px;">
              Glab Tech Services
          </small>
      </div>
      `;

            newStart.innerHTML = `<div style='
          background: #d3d3d344;
          color: #ff000066;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          font-size: 40px;
          z-index: 99999;
          position: fixed;
          width: 300px;
          height: 300px;
          right: 3rem;  /* Horizontally center the div */
          top: 8rem;   /* Vertically center the div */
          transform: translate(-50%, -50%); /* Move the div back by half its width and height */
      '>
        CVPAP<br>
          <small style="font-size: 10px;">
              Glab Tech Services
          </small>
      </div>
      `;

            newEnd.innerHTML = `<div style='
          background: #d3d3d344;
          color: #ff000044;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          font-size: 20px;
          z-index: 99999;
          position: fixed;
          width: 300px;
          height: 300px;
          left: 8rem;  /* Horizontally center the div */
          bottom: 1rem;   /* Vertically center the div */
          transform: translate(-50%, -50%); /* Move the div back by half its width and height */
      '>
        CVPAP<br>
          <small style="font-size: 10px;">
              Glab Tech Services
          </small>
      </div>
      `;

            const currentDiv = document.querySelector(selector);
            currentDiv.prepend(newDiv);
            currentDiv.prepend(newStart);
            currentDiv.prepend(newEnd);
          }, resumePages[index]);
        } else {
          await page.evaluate((page) => {
            document.body.innerHTML = page.innerHTML;
          }, resumePages[index]);
        }

        const buffer = await page.pdf({
          printBackground: true,
          height: resumePages[index].height,
          width: pageFormat === 'A4' ? '210mm' : '216mm',
        });

        const pageDoc = await PDFDocument.load(buffer);
        try {
          // const buffefDoc = await this.addWatermarkToPdf(pageDoc, 'watermark');

          // const copiedPages = await pdf.copyPages(buffefDoc, [0]);
          const pageDoc = await PDFDocument.load(buffer);
          const copiedPages = await pdf.copyPages(pageDoc, [0]);

          copiedPages.forEach((copiedPage) => {
            pdf.addPage(copiedPage);
          });
        } catch (e) {
          Logger.log(e);
        }
      }

      await page.close();

      const pdfBytes = await pdf.save({ addDefaultPage: false });
      if (order !== null) {
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, filename), pdfBytes);
      }

      // Delete PDF artifacts after `pdfDeletionTime` ms
      const timeout = setTimeout(async () => {
        try {
          await unlink(join(directory, filename));

          this.schedulerRegistry.deleteTimeout(`delete-${filename}`);
        } catch {
          // pass through
        }
      }, pdfDeletionTime);

      this.schedulerRegistry.addTimeout(`delete-${filename}`, timeout);
    }
    const result = JSON.stringify({
      message: 'Resume processing is success',
      status: '200',
      url: publicUrl,
    });

    return result;
  }

  async printAsPdfBinary(username: string, slug: string, lastUpdated: string): Promise<string> {
    const serverUrl = this.configService.get('app.serverUrl');

    const directory = join(__dirname, '..', 'assets/exports');
    const filename = `CVpap_${username}_${slug}_${lastUpdated}.pdf`;
    const publicUrl = `${serverUrl}/assets/exports/${filename}`;
    let pdfBytes = null;

    try {
      await access(join(directory, filename));
    } catch {
      const activeSchedulerTimeouts = this.schedulerRegistry.getTimeouts();

      // await readdir(directory).then(async (files) => {
      //   await Promise.all(
      //     files.map(async (file) => {
      //       if (file.startsWith(`CVpap_${username}_${slug}`)) {
      //         await unlink(join(directory, file));
      //         if (activeSchedulerTimeouts[`delete-${file}`]) {
      //           // this.schedulerRegistry.deleteTimeout(`delete-${file}`);
      //         }
      //       }
      //     }),
      //   );
      // });

      const url = this.configService.get('app.url');
      const secretKey = this.configService.get('app.secretKey');
      // const pdfDeletionTime = this.configService.get<number>('cache.pdfDeletionTime');
      const page = await this.browser.newPage();

      await page.goto(`${url}/${username}/${slug}/printer?secretKey=${secretKey}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('html.wf-active', { state: 'visible' });

      const pageFormat: PageConfig['format'] = await page.$$eval(
        '[data-page]',
        (pages) => pages[0].getAttribute('data-format') as PageConfig['format'],
      );

      const resumePages = await page.$$eval('[data-page]', (pages) =>
        pages.map((page, index) => ({
          pageNumber: index + 1,
          innerHTML: page.innerHTML,
          height: page.clientHeight,
        })),
      );

      const pdf = await PDFDocument.create();

      for (let index = 0; index < resumePages.length; index++) {
        await page.evaluate((page) => (document.body.innerHTML = page.innerHTML), resumePages[index]);

        const buffer = await page.pdf({
          printBackground: true,
          height: resumePages[index].height,
          width: pageFormat === 'A4' ? '210mm' : '216mm',
        });

        const pageDoc = await PDFDocument.load(buffer);
        const copiedPages = await pdf.copyPages(pageDoc, [0]);

        copiedPages.forEach((copiedPage) => pdf.addPage(copiedPage));
      }

      await page.close();

      pdfBytes = await pdf.save();

      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, filename), pdfBytes);

      // // Delete PDF artifacts after `pdfDeletionTime` ms
      // const timeout = setTimeout(async () => {
      //   try {
      //     await unlink(join(directory, filename));

      //     this.schedulerRegistry.deleteTimeout(`delete-${filename}`);
      //   } catch {
      //     // pass through
      //   }
      // }, pdfDeletionTime);

      // this.schedulerRegistry.addTimeout(`delete-${filename}`, timeout);
    }

    return pdfBytes;
  }
}
