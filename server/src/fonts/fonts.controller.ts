import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';

import { FontsService } from './fonts.service';

@Controller('fonts')
@UseInterceptors(CacheInterceptor)
export class FontsController {
  constructor(private fontsService: FontsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.fontsService.getAll();
  }
}
