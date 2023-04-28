import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ResumeModule } from "@/resume/resume.module";

import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  imports: [ConfigModule, ResumeModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
