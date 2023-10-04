import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memoryStorage } from 'multer';

import { AuthModule } from '@/auth/auth.module';
import { ResumeModule } from '@/resume/resume.module';
import { UsersModule } from '@/users/users.module';

import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Order]),
    MulterModule.register({ storage: memoryStorage() }),
    AuthModule,
    UsersModule,
    ResumeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
