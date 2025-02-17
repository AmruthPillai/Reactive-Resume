import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.sectionItem.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }
}
