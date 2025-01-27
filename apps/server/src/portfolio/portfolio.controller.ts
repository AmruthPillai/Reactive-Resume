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
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  CreatePortfolioDto,
  ImportPortfolioDto,
  PortfolioDto,
  UpdatePortfolioDto,
} from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";

import { OptionalGuard } from "../auth/guards/optional.guard";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { Portfolio } from "./decorators/portfolio.decorator";
import { PortfolioGuard } from "./guards/portfolio.guard";
import { PortfolioService } from "./portfolio.service";

@ApiTags("Portfolio")
@Controller("portfolio")
export class PortfolioController {
  private readonly logger = new Logger(PortfolioController.name);

  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createPortfolioDto: CreatePortfolioDto) {
    try {
      return await this.portfolioService.create(user.id, createPortfolioDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.PortfolioSlugAlreadyExists);
      }

      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  async findAll(@User() user: UserEntity) {
    try {
      return await this.portfolioService.findAll(user.id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get(":id")
  @UseGuards(TwoFactorGuard, PortfolioGuard)
  findOne(@Portfolio() portfolio: PortfolioDto) {
    return portfolio;
  }

  @Get(":id/statistics")
  @UseGuards(TwoFactorGuard)
  async findOneStatistics(@Param("id") id: string) {
    try {
      return await this.portfolioService.findOneStatistics(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get("/public/:username/:slug")
  @UseGuards(OptionalGuard)
  async findOneByUsernameSlug(
    @Param("username") username: string,
    @Param("slug") slug: string,
    @User("id") userId: string,
  ) {
    try {
      return await this.portfolioService.findOneByUsernameSlug(username, slug, userId);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  async update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    try {
      return await this.portfolioService.update(user.id, id, updatePortfolioDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.PortfolioSlugAlreadyExists);
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(":id/lock")
  @UseGuards(TwoFactorGuard)
  async lock(@User() user: UserEntity, @Param("id") id: string, @Body("set") set = true) {
    try {
      return await this.portfolioService.lock(user.id, id, set);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  async remove(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.portfolioService.remove(user.id, id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post("import")
  @UseGuards(TwoFactorGuard)
  async import(@User() user: UserEntity, @Body() importPortfolioDto: ImportPortfolioDto) {
    try {
      return await this.portfolioService.import(user.id, importPortfolioDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
