import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '@/mail/mail.module';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
