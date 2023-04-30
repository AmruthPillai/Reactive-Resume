import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import type { Resume } from "@reactive-resume/schema";
import { reactiveResumeV2JsonImportedSchema } from "@reactive-resume/schema";

import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('/:username/:slug')
  printAsPdf(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Query('lastUpdated') lastUpdated: string
  ): Promise<string> {
    return this.printerService.printAsPdf(username, slug, lastUpdated);
  }

  @Get()
  printJsonAsPdf(@Body() body: Partial<Resume>): Promise<string> {
    reactiveResumeV2JsonImportedSchema.parse(body)

    return this.printerService.printJsonAsPdf(
      body,
      new Date().toISOString()
    );
  }
}
