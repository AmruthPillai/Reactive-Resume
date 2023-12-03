import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StripeCheckoutResponse } from "@reactive-resume/schema";
import { RedisService } from "@songkeys/nestjs-redis";
import { Redis } from "ioredis";
import { PrismaService } from "nestjs-prisma";
import Stripe from "stripe";

import { Config } from "../config/schema";
import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class StripeService {
  private readonly redis: Redis;
  private readonly stripe: Stripe;
  private readonly frontendUrl: string;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly redisService: RedisService,
    private readonly utils: UtilsService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.redis = this.redisService.getClient();
    this.stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY") || "", {});
    this.frontendUrl =
      (this.configService.get("NODE_ENV") === "production"
        ? this.configService.get("PUBLIC_URL")
        : this.configService.get("__DEV__CLIENT_URL")) || "";
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
  async createCheckoutSession(userId: string, priceId: string, quantity: number) {
    // Get the user from auth
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        customer: true,
        subscription: true,
      },
    });

    const price = await this.prisma.price.findFirstOrThrow({
      where: {
        id: priceId,
      },
    });

    const metadata = {
      appUserId: userId,
    };

    this.logger.log(user);

    let customer = user?.customer;
    // Check If customer exist otherwise create a customer and map the user Id
    if (!customer) {
      const customerData: { metadata: { appUserId: string }; email?: string } = {
        email: user?.email,
        metadata,
      };
      const stripeCustomer = await this.stripe.customers.create(customerData);
      this.logger.log(stripeCustomer);
      customer = await this.prisma.customer.create({
        data: {
          stripeCustomerId: stripeCustomer.id,
          userId: userId,
        },
      });
      this.logger.log(customer);
    }

    let sessionId;
    if (price.pricingType === "recurring") {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer: customer.stripeCustomerId,
        customer_update: {
          address: "auto",
        },
        line_items: [
          {
            price: price.id,
            quantity,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        subscription_data: {
          // trial_period_days: 1,
          metadata,
        },
        success_url: `${this.frontendUrl}/success`,
        cancel_url: `${this.frontendUrl}/cancel`,
      });
      sessionId = session.id;
    } else if (price.pricingType === "one_time") {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer: customer.stripeCustomerId,
        customer_update: {
          address: "auto",
        },
        line_items: [
          {
            price: price.id,
            quantity,
          },
        ],
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${this.frontendUrl}/success`,
        cancel_url: `${this.frontendUrl}/cancel`,
      });
      sessionId = session.id;
    }
    return { sessionId: sessionId } as StripeCheckoutResponse;
  }
}
