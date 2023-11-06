import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import {
  BadRequestException,
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
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  CreateResumeDto,
  ImportResumeDto,
  ResumeDto,
  StatisticsDto,
  UpdateResumeDto,
  UrlDto,
} from "@reactive-resume/dto";
import { resumeDataSchema } from "@reactive-resume/schema";
import { ZodSerializerDto } from "nestjs-zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { User } from "@/server/user/decorators/user.decorator";

import { OptionalGuard } from "../auth/guards/optional.guard";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { ErrorMessage } from "../constants/error-message";
import { Resume } from "./decorators/resume.decorator";
import { ResumeGuard } from "./guards/resume.guard";
import { ResumeService } from "./resume.service";

@ApiTags("Resume")
@Controller("resume")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get("schema")
  @UseInterceptors(CacheInterceptor)
  @CacheKey("resume:schema")
  async getSchema() {
    return zodToJsonSchema(resumeDataSchema);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  create(@User() user: UserEntity, @Body() createResumeDto: CreateResumeDto) {
    try {
      return this.resumeService.create(user.id, createResumeDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.ResumeSlugAlreadyExists);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Post("import")
  @UseGuards(TwoFactorGuard)
  import(@User() user: UserEntity, @Body() importResumeDto: ImportResumeDto) {
    try {
      return this.resumeService.import(user.id, importResumeDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.ResumeSlugAlreadyExists);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.resumeService.findAll(user.id);
  }

  @Get(":id")
  @UseGuards(TwoFactorGuard, ResumeGuard)
  findOne(@Resume() resume: ResumeDto) {
    return resume;
  }

  @Get(":id/statistics")
  @UseGuards(TwoFactorGuard)
  @ZodSerializerDto(StatisticsDto)
  findOneStatistics(@User("id") userId: string, @Param("id") id: string) {
    return this.resumeService.findOneStatistics(userId, id);
  }

  @Get("/public/:username/:slug")
  findOneByUsernameSlug(@Param("username") username: string, @Param("slug") slug: string) {
    return this.resumeService.findOneByUsernameSlug(username, slug);
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update(user.id, id, updateResumeDto);
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  remove(@User() user: UserEntity, @Param("id") id: string) {
    return this.resumeService.remove(user.id, id);
  }

  @Get("/print/:id")
  @UseGuards(OptionalGuard, ResumeGuard)
  @ZodSerializerDto(UrlDto)
  async printResume(@Resume() resume: ResumeDto) {
    try {
      const url = await this.resumeService.printResume(resume);

      return { url };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get("/print/:id/preview")
  @UseGuards(TwoFactorGuard, ResumeGuard)
  @ZodSerializerDto(UrlDto)
  async printPreview(@Resume() resume: ResumeDto) {
    try {
      const url = await this.resumeService.printPreview(resume);

      return { url };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
