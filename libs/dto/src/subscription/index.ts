import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const subscriptionSchema = z.object({
  id: z.string(),
  customerId: z.string().optional(),
  subscriptionId: z.string().optional(),
  variantId: z.string().optional(),
  currentPeriodEnd: z.date().or(z.dateString()),
});

export class SubscriptionDto extends createZodDto(subscriptionSchema) {}
