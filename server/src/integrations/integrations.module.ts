import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { mkdir } from 'fs/promises';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

import { ResumeModule } from '@/resume/resume.module';
import { User } from '@/users/entities/user.entity';

import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

@Module({
  imports: [
    ResumeModule,
    MulterModule.register({
      storage: diskStorage({
        destination: async (req, _, cb) => {
          const userId = (req.user as User).id;
          const destination = join(__dirname, `assets/integrations/${userId}`);

          await mkdir(destination, { recursive: true });

          cb(null, destination);
        },
        filename: (_, file, cb) => {
          const filename = new Date().getTime() + extname(file.originalname);

          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
})
export class IntegrationsModule {}
