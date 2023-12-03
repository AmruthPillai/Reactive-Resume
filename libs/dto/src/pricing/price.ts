import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { subscriptionSchema } from "./subscription";

// import { productSchema } from "./product";

export const priceSchema = z.object({
  // Price ID from Stripe, e.g. price_1234.
  id: z.string(),
  // The ID of the prduct that this price belongs to.
  productId: z.string(),
  // product: productSchema.optional(),
  // Whether the price can be used for new purchases.
  active: z.boolean().default(false),
  // A brief description of the price.
  description: z.string(),
  // The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).
  unitAmount: z.number().int().default(0),
  // Three-letter ISO currency code, in lowercase.
  currency: z.string().length(3).default("INR"),
  // One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  pricingType: z.enum(["one_time", "recurring"]).default("recurring"),
  // The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  interval: z.enum(["day", "week", "month", "year"]).default("month"),
  // The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  intervalCount: z.number().int().default(0),
  // Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trialPeriodDays: z.number().int().default(0),
  // Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata: z.json().optional(),

  subscription: subscriptionSchema.optional(),
});

export class PriceDto extends createZodDto(priceSchema) {}
