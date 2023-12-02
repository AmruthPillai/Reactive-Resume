import { Injectable } from "@nestjs/common";
import { RedisService } from "@songkeys/nestjs-redis";
import { Redis } from "ioredis";
import { PrismaService } from "nestjs-prisma";

import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class StripeService {
  private readonly redis: Redis;

  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly redisService: RedisService,
    private readonly utils: UtilsService,
  ) {
    this.redis = this.redisService.getClient();
  }

  findAllProducts() {
    return this.prisma.product.findMany({
      where: { active: true },
      include: {
        prices: true,
      },
    });
    // return this.utils.getCachedOrSet(`products`, () =>
    //   this.prisma.product.findMany({
    //     where: { active: true },
    //   }),
    // );
  }
  findAllPrices() {
    return this.prisma.price.findMany({
      where: { active: true },
      include: {
        product: true,
        subscription: true,
      },
    });
    // return this.utils.getCachedOrSet(`products`, () =>
    //   this.prisma.product.findMany({
    //     where: { active: true },
    //   }),
    // );
  }
  findAllSubscriptions(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId: userId },
      include: {
        price: true,
        user: true,
      },
    });
  }
}
