import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SectionFormat } from "@prisma/client";
import { CreateSectionDto } from "../../../../libs/dto/src/section";
import deepmerge from "deepmerge";
import { defaultResumeData, defaultSectionData, SectionData } from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.section.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  async createSection(userId: string,createSectionDto: CreateSectionDto) {
    try {
      // Create the new section
      return await this.prisma.section.create({
        data: {
          userId: userId,
          data: createSectionDto.data,
          format: createSectionDto.format,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  deleteSection(id: string) {
    this.prisma.section.delete({ where: { id } });
  }
}
