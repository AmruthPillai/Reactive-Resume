import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Prisma, User as UserEntity } from "@prisma/client";
import { sectionSchemaWithData } from "@reactive-resume/schema";
import zodToJsonSchema from "zod-to-json-schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { SectionService } from "./section.service";
import { CreateSectionDto } from "../../../../libs/dto/src/section";

@ApiTags("Section")
@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get("schema")
  getSchema() {
    return zodToJsonSchema(sectionSchemaWithData);
  }

  @Get(":userId")
  findAll(@Param("userId") userId: string) {
    return this.sectionService.findAll(userId);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createSectionDto: CreateSectionDto) {
    console.log(createSectionDto);
    try {
      return await this.sectionService.createSection(user.id, createSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  delete(@Param("id") id: string) {}
}
