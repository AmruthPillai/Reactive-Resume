import { CacheModule } from "@nestjs/cache-manager";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memoryStorage } from 'multer';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

import { Resume } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Resume]),
    MulterModule.register({ storage: memoryStorage() }),
    AuthModule,
    UsersModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('cache.pdfDeletionTime'),
      })
    })
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
