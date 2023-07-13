import { Controller, GatewayTimeoutException, Get, Param, Query } from '@nestjs/common';

import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('/:username/:slug')
  async printAsPdf(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Query('lastUpdated') lastUpdated: string,
  ): Promise<string> {
    try {
      return await this.printerService.printAsPdf(username, slug, lastUpdated);
    } catch (error) {
      throw new GatewayTimeoutException();
    }
  }
}
