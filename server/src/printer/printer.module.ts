import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  imports: [ConfigModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
