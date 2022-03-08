import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mkdir } from 'fs/promises';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

import { AuthModule } from '@/auth/auth.module';
import { User } from '@/users/entities/user.entity';
import { UsersModule } from '@/users/users.module';

import { Resume } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Resume]),
    MulterModule.register({
      storage: diskStorage({
        destination: async (req, _, cb) => {
          const userId = (req.user as User).id;
          const resumeId = +req.params.id;
          const destination = join(__dirname, '..', `assets/uploads/${userId}/${resumeId}`);

          await mkdir(destination, { recursive: true });

          cb(null, destination);
        },
        filename: (_, file, cb) => {
          const filename = new Date().getTime() + extname(file.originalname);

          cb(null, filename);
        },
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
