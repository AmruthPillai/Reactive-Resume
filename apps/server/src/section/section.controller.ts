import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {Prisma, User as UserEntity} from "@prisma/client";
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

  @Get(":userId")
  findAll(@Param("userId") userId: string) {
    return this.sectionService.findAll(userId);
  }

  @Post()
  async createSection( @Body() newSection: Prisma.SectionCreateInput) {
    try {

      return await this.sectionService.createSection( newSection);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  @Delete(":id")
  deleteSection(@Param("id") id: string) {

  }
}
