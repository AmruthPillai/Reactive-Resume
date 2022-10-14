import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PageConfig } from '@reactive-resume/schema';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import { Browser, chromium } from 'playwright-chromium';

export const DELETION_TIME = 10 * 1000; // 10 seconds

@Injectable()
export class PrinterService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;

  constructor(private readonly schedulerRegistry: SchedulerRegistry, private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.browser = await chromium.launch({
      args: ['--disable-dev-shm-usage'],
    });
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async printAsPdf(username: string, slug: string): Promise<string> {
    const url = this.configService.get<string>('app.url');
    const serverUrl = this.configService.get<string>('app.serverUrl');
    const secretKey = this.configService.get<string>('app.secretKey');

    const page = await this.browser.newPage();

    await page.goto(`${url}/${username}/${slug}/printer?secretKey=${secretKey}`);
    await page.waitForSelector('html.wf-active');

    const pageFormat: PageConfig['format'] = await page.$$eval(
      '[data-page]',
      (pages) => pages[0].getAttribute('data-format') as PageConfig['format']
    );

    const resumePages = await page.$$eval('[data-page]', (pages) =>
      pages.map((page, index) => ({
        pageNumber: index + 1,
        innerHTML: page.innerHTML,
        height: page.clientHeight,
      }))
    );

    const pdf = await PDFDocument.create();
    const directory = join(__dirname, '..', 'assets/exports');
    const filename = `RxResume_PDFExport_${nanoid()}.pdf`;
    const publicUrl = `${serverUrl}/assets/exports/${filename}`;

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

    // Delete PDF artifacts after DELETION_TIME ms
    const timeout = setTimeout(async () => {
      try {
        await unlink(join(directory, filename));

        this.schedulerRegistry.deleteTimeout(`delete-${filename}`);
      } catch {
        // pass through
      }
    }, DELETION_TIME);

    this.schedulerRegistry.addTimeout(`delete-${filename}`, timeout);

    return publicUrl;
  }
}
