import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.section.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }
}
