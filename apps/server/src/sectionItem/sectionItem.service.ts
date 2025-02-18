import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateSectionDto, UpdateSectionDto } from "@reactive-resume/dto";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.sectionItem.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  async createSection(userId: string, createSectionDto: CreateSectionDto) {
    try {
      // Create the new section
      return await this.prisma.sectionItem.create({
        data: {
          data: createSectionDto.data,
          format: createSectionDto.format,
          userId: userId,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateSection(userId: string, id: string, updateSectionDto: UpdateSectionDto) {
    try {
      return await this.prisma.sectionItem.update({
        data: {
          data: updateSectionDto.data,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSection(id: string) {
    try {
      return await this.prisma.sectionItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
