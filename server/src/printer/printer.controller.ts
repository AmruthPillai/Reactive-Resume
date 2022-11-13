import { Controller, Get, Param, Query } from '@nestjs/common';

import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('/:username/:slug')
  printAsPdf(@Param('username') username: string, @Param('slug') slug: string, @Query('lastUpdated') lastUpdated: string): Promise<string> {
    return this.printerService.printAsPdf(username, slug, lastUpdated);
  }
}
