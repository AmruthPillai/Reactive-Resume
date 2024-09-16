import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const subscriptionSchema = z.object({
  id: z.string(),
  customerId: z.string().optional(),
  paymentId: z.string().optional(),
  isCanceled: z.boolean().default(false),
  isPro: z.boolean().default(false),
  customerPageUrl: z.string().optional().nullable(),
});

export class SubscriptionDto extends createZodDto(subscriptionSchema) {}
