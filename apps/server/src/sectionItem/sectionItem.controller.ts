import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,

  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { CreateSectionDto, UpdateSectionDto } from "@reactive-resume/dto";
import { sectionSchemaWithData } from "@reactive-resume/schema";
import zodToJsonSchema from "zod-to-json-schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { SectionItemService } from "./sectionItem.service";


@ApiTags("SectionItem")
@Controller("sectionItem")
export class SectionItemController {
  constructor(private readonly sectionItemService: SectionItemService) {
  }

  @Get("schema")
  getSchema() {
    return zodToJsonSchema(sectionSchemaWithData);
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.sectionItemService.findAll(user.id);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createSectionDto: CreateSectionDto) {
    try {
      return await this.sectionItemService.createSection(user.id, createSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get("/hello")
  hello() {
    return "Hello World!";
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  async update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ) {
    try {
      return await this.sectionItemService.updateSection(user.id, id, updateSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
