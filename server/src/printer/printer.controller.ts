import { Controller, GatewayTimeoutException, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express'; // Import the Response object

import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('/:username/:slug')
  async printAsPdf(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Query('lastUpdated') lastUpdated: string,
    @Query('preview') preview: string,
  ): Promise<string> {
    try {
      let prev = false;
      if (preview != null) {
        prev = true;
      }
      return await this.printerService.printAsPdf(username, slug, lastUpdated, prev);
    } catch (error) {
      throw new GatewayTimeoutException();
    }
  }

  @Get('/binary/:username/:slug')
  async printAsPdfBinary(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Query('lastUpdated') lastUpdated: string,
    @Res() res: Response, // Inject the Response object
  ): Promise<void> {
    try {
      const pdfData = await this.printerService.printAsPdfBinary(username, slug, lastUpdated);

      // Set the response headers for a PDF file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${username}_${slug}.pdf`);

      // Send the PDF data in the response body
      res.send(pdfData);
    } catch (error) {
      throw new GatewayTimeoutException();
    }
  }
}
