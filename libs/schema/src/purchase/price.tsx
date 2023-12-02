import { z } from "zod";

import { idSchema } from "../shared";
import { productSchema } from "./product";

// Schema
export const priceSchema = z.object({
  id: idSchema,
  product_id: productSchema,
  active: z.boolean().default(true),
  description: z.string().nullable(),
  unit_amount: z.number(),
  // Three-letter ISO currency code, in lowercase.
  currency: z.string().length(3),
  type: z.enum(["one_time", "recurring"]),
  interval: z.enum(["lifetime", "year", "month"]),
  interval_count: z.number(),
  trial_period_days: z.number(),
  metadata: z.string(),
});

// Type
export type Price = z.infer<typeof priceSchema>;

// Defaults
export const defaultPrice: Price = {
  unit_amount: 0,
  currency: "$",
  interval: "month",
  description: "",
};
