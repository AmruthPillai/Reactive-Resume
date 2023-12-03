import { z } from "zod";

// Schema
export const priceSchema = z.object({
  id: z.string(),
  productId: z.string(),
  active: z.boolean().default(false),
  description: z.string().nullable(),
  unitAmount: z.number().default(0),
  // Three-letter ISO currency code, in lowercase.
  currency: z.string().length(3),
  pricingType: z.enum(["one_time", "recurring"]),
  interval: z.enum(["lifetime", "year", "month"]),
  intervalCount: z.number().default(0),
  trialPeriodDays: z.number().default(0),
  metadata: z.string(),
});

// Type
export type Price = z.infer<typeof priceSchema>;
