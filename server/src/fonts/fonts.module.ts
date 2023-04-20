import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FontsController } from './fonts.controller';
import { FontsService } from './fonts.service';

// Every week
const cacheTTL = 60 * 60 * 24 * 7;

@Module({
  imports: [ConfigModule, HttpModule, CacheModule.register({ ttl: cacheTTL })],
  controllers: [FontsController],
  providers: [FontsService],
})
export class FontsModule {}
