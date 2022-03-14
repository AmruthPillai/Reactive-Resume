import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { User } from '@/decorators/user.decorator';

import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('linkedin')
  @UseInterceptors(FileInterceptor('file'))
  linkedIn(@User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('You must upload a valid zip archive downloaded from LinkedIn.', HttpStatus.BAD_REQUEST);
    }

    return this.integrationsService.linkedIn(userId, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('json-resume')
  @UseInterceptors(FileInterceptor('file'))
  jsonResume(@User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('You must upload a valid JSON file.', HttpStatus.BAD_REQUEST);
    }

    return this.integrationsService.jsonResume(userId, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reactive-resume')
  @UseInterceptors(FileInterceptor('file'))
  reactiveResume(@User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('You must upload a valid JSON file.', HttpStatus.BAD_REQUEST);
    }

    return this.integrationsService.reactiveResume(userId, file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reactive-resume-v2')
  @UseInterceptors(FileInterceptor('file'))
  reactiveResumeV2(@User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('You must upload a valid JSON file.', HttpStatus.BAD_REQUEST);
    }

    return this.integrationsService.reactiveResumeV2(userId, file.path);
  }
}
