import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.section.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  async createSection(data: Prisma.SectionCreateInput) {
    try {
      // Create the new section
      return await this.prisma.section.create({
        data,
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
