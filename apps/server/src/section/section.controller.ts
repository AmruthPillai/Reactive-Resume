import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { CreateSectionDto, UpdateSectionDto } from "@reactive-resume/dto";
import { sectionSchemaWithData } from "@reactive-resume/schema";
import zodToJsonSchema from "zod-to-json-schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { SectionService } from "./section.service";

@ApiTags("Section")
@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get("schema")
  getSchema() {
    return zodToJsonSchema(sectionSchemaWithData);
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.sectionService.findAll(user.id);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createSectionDto: CreateSectionDto) {
    try {
      return await this.sectionService.createSection(user.id, createSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  async update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    try {
      return await this.sectionService.updateSection(user.id, id, updateSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  async delete(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionService.deleteSection(user.id, id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
