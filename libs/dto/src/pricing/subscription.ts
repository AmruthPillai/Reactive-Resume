import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

// import { userSchema } from "../user";
// import { priceSchema } from "./price";

export const subscriptionSchema = z.object({
  // Subscription ID from Stripe, e.g. sub_1234.
  id: z.string(),
  userId: idSchema,
  // user: userSchema.optional(),
  // The status of the subscription object, one of subscription_status type above.
  status: z
    .enum([
      "trialing",
      "active",
      "canceled",
      "incomplete",
      "incomplete_expired",
      "past_due",
      "unpaid",
      "paused",
    ])
    .default("unpaid"),
  // Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata: z.json().optional(),
  // ID of the price that created this subscription.
  priceId: idSchema,
  // price: priceSchema.optional(),
  // Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity: z.number().int().default(1),
  // If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancelAtPeriodEnd: z.boolean().default(false),
  // Time at which the subscription was created.
  createdAt: z.date().or(z.dateString()),
  // Start of the current period that the subscription has been invoiced for.
  currentPeriodStart: z.date().or(z.dateString()),
  // End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  currentPeriodEnd: z.date().or(z.dateString()),
  // If the subscription has ended, the timestamp of the date the subscription ended.
  endedAt: z.date().or(z.dateString()).optional(),
  // A date in the future at which the subscription will automatically get canceled.
  cancelAt: z.date().or(z.dateString()).optional(),
  // If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceledAt: z.date().or(z.dateString()).optional(),
  // If the subscription has a trial, the beginning of that trial.
  trialStart: z.date().or(z.dateString()).optional(),
  // If the subscription has a trial, the end of that trial.
  trialEnd: z.date().or(z.dateString()).optional(),
});

export class SubscriptionDto extends createZodDto(subscriptionSchema) {}
