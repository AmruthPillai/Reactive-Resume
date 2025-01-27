// server/src/portfolio/portfolio.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreatePortfolioDto, UpdatePortfolioDto } from "@reactive-resume/dto";
import { ErrorMessage, kebabCase } from "@reactive-resume/utils";
import { PrismaService } from "nestjs-prisma";

import { StorageService } from "../storage/storage.service";

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(userId: string, createPortfolioDto: CreatePortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        userId,
        title: createPortfolioDto.title,
        slug: createPortfolioDto.slug ?? kebabCase(createPortfolioDto.title),
        visibility: createPortfolioDto.visibility,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.portfolio.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.portfolio.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
    }

    return this.prisma.portfolio.findUniqueOrThrow({ where: { id } });
  }

  async findOneStatistics(id: string) {
    const result = await this.prisma.portfolioStatistics.findFirst({
      select: { views: true },
      where: { portfolioId: id },
    });

    return {
      views: result?.views ?? 0,
    };
  }

  async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const portfolio = await this.prisma.portfolio.findFirstOrThrow({
      where: { user: { username }, slug, visibility: "public" },
    });

    // Update statistics: increment the number of views by 1
    if (!userId) {
      await this.prisma.portfolioStatistics.upsert({
        where: { portfolioId: portfolio.id },
        create: { views: 1, portfolioId: portfolio.id },
        update: { views: { increment: 1 } },
      });
    }

    return portfolio;
  }

  async update(userId: string, id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const { locked } = await this.prisma.portfolio.findUniqueOrThrow({
        where: { id },
        select: { locked: true },
      });

      if (locked) throw new BadRequestException(ErrorMessage.PortfolioLocked);

      return await this.prisma.portfolio.update({
        data: {
          title: updatePortfolioDto.title,
          slug: updatePortfolioDto.slug,
          visibility: updatePortfolioDto.visibility,
          data: updatePortfolioDto.data as unknown as Prisma.JsonObject,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      if (error.code === "P2025") {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  lock(userId: string, id: string, set: boolean) {
    return this.prisma.portfolio.update({
      data: { locked: set },
      where: { userId_id: { userId, id } },
    });
  }

  async remove(userId: string, id: string) {
    await this.storageService.deleteObject(userId, "previews", id);

    return this.prisma.portfolio.delete({ where: { userId_id: { userId, id } } });
  }
}
