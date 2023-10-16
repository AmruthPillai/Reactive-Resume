import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from 'src/orders/order.module';

import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  imports: [ConfigModule, OrderModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
