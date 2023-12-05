/* eslint-disable no-case-declarations */
import { Injectable, Logger, RawBodyRequest } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StripeCheckoutResponse } from "@reactive-resume/schema";
import { RedisService } from "@songkeys/nestjs-redis";
import { Redis } from "ioredis";
import { PrismaService } from "nestjs-prisma";
import Stripe from "stripe";

import { Config } from "../config/schema";
import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

@Injectable()
export class StripeService {
  private readonly redis: Redis;
  private readonly stripe: Stripe;
  private readonly frontendUrl: string;
  private readonly webhookSecret: string;
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
    this.webhookSecret = this.configService.get("STRIPE_WEBHOOK_SECRET") || "";
  }

  findAllProducts() {
    return this.prisma.product.findMany({
      where: { active: true },
      include: {
        prices: true,
      },
    });
  }
  findAllPrices() {
    return this.prisma.price.findMany({
      where: { active: true },
      include: {
        product: true,
        subscription: true,
      },
      orderBy: {
        currency: "asc",
      },
    });
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

  async createPortalLink(userId: string, email: string) {
    const customer = await this.createOrRetrieveCustomer({
      userId: userId || "",
      email: email || "",
    });
    const { url } = await this.stripe.billingPortal.sessions.create({
      customer,
      return_url: `${this.frontendUrl}/dashboard/settings?payment=success`,
    });
    return { url };
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

    // Check If customer exist otherwise create a customer and map the user Id
    // 3. Retrieve or create the customer in Stripe
    const customerId = await this.createOrRetrieveCustomer({
      userId: user?.id || "",
      email: user?.email || "",
    });

    let sessionId;
    if (price.pricingType === "recurring") {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer: customerId,
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
        success_url: `${this.frontendUrl}/dashboard/settings?payment=success`,
        cancel_url: `${this.frontendUrl}/pricing?payment=failed`,
      });
      sessionId = session.id;
    } else if (price.pricingType === "one_time") {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer: customerId,
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

  async webhooks(req: RawBodyRequest<Request>, res: Response, sig: string) {
    const body = await req.rawBody;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
      if (!sig || !webhookSecret || !body) return;
      event = this.stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "product.created":
          case "product.updated":
            await this.upsertProductRecord(event.data.object as Stripe.Product);
            break;
          case "price.created":
          case "price.updated":
            await this.upsertPriceRecord(event.data.object as Stripe.Price);
            break;
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            await this.manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === "customer.subscription.created",
            );
            break;
          case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription;
              await this.manageSubscriptionStatusChange(
                subscriptionId as string,
                checkoutSession.customer as string,
                true,
              );
            }
            break;
          default:
            throw new Error("Unhandled relevant event!");
        }
      } catch (error) {
        console.log(error);
        return new Response("Webhook handler failed. View your nextjs function logs.", {
          status: 400,
        });
      }
    }
    return new Response(JSON.stringify({ received: true }));
  }

  upsertProductRecord = async (product: Stripe.Product) => {
    await this.prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
      },
      create: {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
      },
    });
    console.log(`Product inserted/updated: ${product.id}`);
  };

  upsertPriceRecord = async (price: Stripe.Price) => {
    await this.prisma.price.upsert({
      where: {
        id: price.id,
      },
      update: {
        productId: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? null,
        pricingType: price.type,
        unitAmount: price.unit_amount ?? null,
        interval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata,
      },
      create: {
        id: price.id,
        productId: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? null,
        pricingType: price.type,
        unitAmount: price.unit_amount ?? null,
        interval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata,
      },
    });

    console.log(`Price inserted/updated: ${price.id}`);
  };

  manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false,
  ) => {
    // Get customer's UUID from mapping table.
    const customerData = await this.prisma.customer.findFirstOrThrow({
      where: {
        stripeCustomerId: customerId,
      },
    });

    const { id: userId } = customerData!;

    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"],
    });

    await this.prisma.subscription.upsert({
      where: {
        id: subscription.id,
      },
      create: {
        userId: userId,
        metadata: subscription.metadata,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        quantity: 1,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        cancelAt: subscription.cancel_at
          ? this.utils.toDateTime(subscription.cancel_at).toISOString()
          : null,
        canceledAt: subscription.canceled_at
          ? this.utils.toDateTime(subscription.canceled_at).toISOString()
          : null,
        currentPeriodStart: this.utils.toDateTime(subscription.current_period_start).toISOString(),
        currentPeriodEnd: this.utils.toDateTime(subscription.current_period_end).toISOString(),
        createdAt: this.utils.toDateTime(subscription.created).toISOString(),
        endedAt: subscription.ended_at
          ? this.utils.toDateTime(subscription.ended_at).toISOString()
          : null,
        trialStart: subscription.trial_start
          ? this.utils.toDateTime(subscription.trial_start).toISOString()
          : null,
        trialEnd: subscription.trial_end
          ? this.utils.toDateTime(subscription.trial_end).toISOString()
          : null,
      },
      update: {
        id: subscription.id,
        userId: userId,
        metadata: subscription.metadata,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        quantity: 1,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        cancelAt: subscription.cancel_at
          ? this.utils.toDateTime(subscription.cancel_at).toISOString()
          : null,
        canceledAt: subscription.canceled_at
          ? this.utils.toDateTime(subscription.canceled_at).toISOString()
          : null,
        currentPeriodStart: this.utils.toDateTime(subscription.current_period_start).toISOString(),
        currentPeriodEnd: this.utils.toDateTime(subscription.current_period_end).toISOString(),
        createdAt: this.utils.toDateTime(subscription.created).toISOString(),
        endedAt: subscription.ended_at
          ? this.utils.toDateTime(subscription.ended_at).toISOString()
          : null,
        trialStart: subscription.trial_start
          ? this.utils.toDateTime(subscription.trial_start).toISOString()
          : null,
        trialEnd: subscription.trial_end
          ? this.utils.toDateTime(subscription.trial_end).toISOString()
          : null,
      },
    });

    console.log(`Inserted/updated subscription [${subscription.id}] for user [${userId}]`);

    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (createAction && subscription.default_payment_method && userId)
      await this.copyBillingDetailsToCustomer(
        userId,
        subscription.default_payment_method as Stripe.PaymentMethod,
      );
  };

  /**
   * Copies the billing details from the payment method to the customer object.
   */
  copyBillingDetailsToCustomer = async (userId: string, payment_method: Stripe.PaymentMethod) => {
    //Todo: check this assertion
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;
    if (!name || !phone || !address) return;
    //@ts-ignore
    await this.stripe.customers.update(customer, { name, phone, address });

    const paymentMethod = { ...payment_method[payment_method.type] };
    const billingAddress = { ...address };

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        billingAddress,
        paymentMethod,
      },
    });
  };

  createOrRetrieveCustomer = async ({ email, userId }: { email: string; userId: string }) => {
    const customerData = await this.prisma.customer.findFirst({
      where: {
        id: userId,
      },
    });

    if (!customerData) {
      // No customer record found, let's create one.
      const customerData: { metadata: { appUserId: string }; email?: string } = {
        metadata: {
          appUserId: userId,
        },
      };
      if (email) customerData.email = email;
      const customer = await this.stripe.customers.create(customerData);
      // Now insert the customer ID into our Supabase mapping table.
      await this.prisma.customer.create({
        data: {
          id: userId,
          stripeCustomerId: customer.id,
        },
      });
      console.log(`New customer created and inserted for ${userId}.`);
      return customer.id;
    }
    return customerData.stripeCustomerId;
  };
}
