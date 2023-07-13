import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { access, mkdir, readdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import { BrowserContext, chromium } from 'playwright-chromium';
import { PageConfig } from 'schema';

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

  async printAsPdf(username: string, slug: string, lastUpdated: string): Promise<string> {
    const serverUrl = this.configService.get('app.serverUrl');

    const directory = join(__dirname, '..', 'assets/exports');
    const filename = `RxResume_PDFExport_${username}_${slug}_${lastUpdated}.pdf`;
    const publicUrl = `${serverUrl}/assets/exports/${filename}`;

    try {
      await access(join(directory, filename));
    } catch {
      const activeSchedulerTimeouts = this.schedulerRegistry.getTimeouts();

      await readdir(directory).then(async (files) => {
        await Promise.all(
          files.map(async (file) => {
            if (file.startsWith(`RxResume_PDFExport_${username}_${slug}`)) {
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

      const pdfBytes = await pdf.save();

      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, filename), pdfBytes);

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

    return publicUrl;
  }
}
