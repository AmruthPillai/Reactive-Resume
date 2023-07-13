import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { OptionalJwtAuthGuard } from '@/auth/guards/optional-jwt.guard';
import { User } from '@/decorators/user.decorator';

import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createResumeDto: CreateResumeDto, @User('id') userId: number) {
    return this.resumeService.create(createResumeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@User('id') userId: number) {
    return this.resumeService.findAllByUser(userId);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('short/:shortId')
  findOneByShortId(
    @Param('shortId') shortId: string,
    @User('id') userId?: number,
    @Query('secretKey') secretKey?: string,
  ) {
    return this.resumeService.findOneByShortId(shortId, userId, secretKey);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':username/:slug')
  findOneByIdentifier(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @User('id') userId?: number,
    @Query('secretKey') secretKey?: string,
  ) {
    return this.resumeService.findOneByIdentifier(username, slug, userId, secretKey);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User('id') userId?: number) {
    return this.resumeService.findOne(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @User('id') userId: number, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/all')
  removeAllByUser(@User('id') userId: number) {
    return this.resumeService.removeAllByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.remove(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.duplicate(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/sample')
  sample(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.sample(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reset')
  reset(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.reset(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Param('id') id: string, @User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
    return this.resumeService.uploadPhoto(+id, userId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/photo')
  deletePhoto(@Param('id') id: string, @User('id') userId: number) {
    return this.resumeService.deletePhoto(+id, userId);
  }
}
