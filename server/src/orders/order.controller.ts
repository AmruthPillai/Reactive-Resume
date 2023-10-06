import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { User } from '@/decorators/user.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @User('id') userId: number, @Query('shortId') shortId: string) {
    return this.orderService.create(createOrderDto, userId, shortId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneOrderById(@User('id') userId: number, @Query('shortId') shortId: string) {
    return this.orderService.findOne(userId);
  }

  // @UseGuards(OptionalJwtAuthGuard)
  // @Get('short/:shortId')
  // findOneByShortId(
  //   @Param('shortId') shortId: string,
  //   @User('id') userId?: number,
  //   @Query('secretKey') secretKey?: string,
  // ) {
  //   return this.resumeService.findOneByShortId(shortId, userId, secretKey);
  // }

  // @UseGuards(OptionalJwtAuthGuard)
  // @Get(':username/:slug')
  // findOneByIdentifier(
  //   @Param('username') username: string,
  //   @Param('slug') slug: string,
  //   @User('id') userId?: number,
  //   @Query('secretKey') secretKey?: string,
  // ) {
  //   return this.resumeService.findOneByIdentifier(username, slug, userId, secretKey);
  // }

  // @UseGuards(OptionalJwtAuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string, @User('id') userId?: number) {
  //   return this.resumeService.findOne(+id, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @User('id') userId: number, @Body() updateResumeDto: UpdateResumeDto) {
  //   return this.resumeService.update(+id, updateResumeDto, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/all')
  // removeAllByUser(@User('id') userId: number) {
  //   return this.resumeService.removeAllByUser(userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string, @User('id') userId: number) {
  //   return this.resumeService.remove(+id, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post(':id/duplicate')
  // duplicate(@Param('id') id: string, @User('id') userId: number) {
  //   return this.resumeService.duplicate(+id, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post(':id/sample')
  // sample(@Param('id') id: string, @User('id') userId: number) {
  //   return this.resumeService.sample(+id, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post(':id/reset')
  // reset(@Param('id') id: string, @User('id') userId: number) {
  //   return this.resumeService.reset(+id, userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put(':id/photo')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadPhoto(@Param('id') id: string, @User('id') userId: number, @UploadedFile() file: Express.Multer.File) {
  //   return this.resumeService.uploadPhoto(+id, userId, file);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id/photo')
  // deletePhoto(@Param('id') id: string, @User('id') userId: number) {
  //   return this.resumeService.deletePhoto(+id, userId);
  // }
}
