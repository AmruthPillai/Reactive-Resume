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
import { CreateCompanyDto, UpdateCompanyDto } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";

import { TwoFactorGuard } from "@/server/auth/guards/two-factor.guard";
import { CompanyService } from "@/server/company/company.service";

import { User } from "../user/decorators/user.decorator";

@ApiTags("Company")
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseGuards(TwoFactorGuard)
  async getByOwnerId(@User() user: UserEntity) {
    try {
      return await this.companyService.getCompanyByOwnerId(user.id);
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyService.create(user.id, createCompanyDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.CompanyNameAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Patch()
  @UseGuards(TwoFactorGuard)
  async update(@User() user: UserEntity, @Body() updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.companyService.update(updateCompanyDto);
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  delete(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return this.companyService.delete(user.id, id);
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
