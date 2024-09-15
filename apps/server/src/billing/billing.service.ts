import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertUserSubscription(
    userId: string,
    subscription: Prisma.SubscriptionCreateWithoutUserInput,
  ) {
    return this.prisma.subscription.upsert({
      where: { userId },
      create: { ...subscription, userId },
      update: subscription,
    });
  }
}
