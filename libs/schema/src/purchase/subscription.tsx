import { z } from "zod";

import { defaultPrice, priceSchema } from "./price";

// Schema
export const subscriptionSchema = z.object({
  prices: z.array(priceSchema),
});

// Type
export type Subscription = z.infer<typeof subscriptionSchema>;

// Defaults
export const defaultSubscription: Subscription = {
  prices: [defaultPrice],
};
