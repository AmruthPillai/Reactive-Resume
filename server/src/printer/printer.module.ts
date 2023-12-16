import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from 'src/orders/order.module';

import { UsersModule } from '@/users/users.module';

import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
  imports: [ConfigModule, OrderModule, UsersModule],
  controllers: [PrinterController],
  providers: [PrinterService],
})
export class PrinterModule {}
