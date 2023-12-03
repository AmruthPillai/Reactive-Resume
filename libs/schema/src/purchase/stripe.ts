import { z } from "zod";

export const stripeCheckoutRequest = z.object({
  quantity: z.number(),
  priceId: z.string(),
});

export const stripeCheckoutResponse = z.object({
  sessionId: z.string(),
});

export type StripeCheckoutRequest = z.infer<typeof stripeCheckoutRequest>;
export type StripeCheckoutResponse = z.infer<typeof stripeCheckoutResponse>;
