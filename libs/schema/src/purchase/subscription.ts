import { z } from "zod";

import { idSchema } from "../shared";
import { priceSchema } from "./price";

// Schema
export const subscriptionSchema = z.object({
  id: z.string(),
  userId: idSchema,
  status: z.enum([
    "trialing",
    "active",
    "canceled",
    "incomplete",
    "incomplete_expired",
    "past_due",
    "unpaid",
    "paused",
  ]),
  price: z.array(priceSchema),
  metadata: z.string(),
  priceId: z.string(),
  quantity: z.number().default(0),
  cancelAtPeriodEnd: z.boolean().default(false),
  createdAt: z.date(),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  endedAt: z.date().nullable(),
  cancelAt: z.date().nullable(),
  canceledAt: z.date().nullable(),
  trialStart: z.date().nullable(),
  trialEnd: z.date().nullable(),
});

// Type
export type Subscription = z.infer<typeof subscriptionSchema>;
