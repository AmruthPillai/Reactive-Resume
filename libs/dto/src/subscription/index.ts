import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const subscriptionSchema = z.object({
  id: z.string(),
  customerId: z.string().optional().nullable(),
  paymentId: z.string().optional().nullable(),
  isCanceled: z.boolean().default(false),
  isPro: z.boolean().default(false),
  customerPageUrl: z.string().optional().nullable(),
  nextBillingDate: z.string().optional().nullable(),
});

export class SubscriptionDto extends createZodDto(subscriptionSchema) {}