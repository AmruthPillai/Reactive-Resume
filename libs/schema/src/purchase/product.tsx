import { z } from "zod";

import { defaultPrice, priceSchema } from "./price";

// Schema
export const productSchema = z.object({
  prices: z.array(priceSchema),
});

// Type
export type Product = z.infer<typeof productSchema>;

// Defaults
export const defaultProduct: Product = {
  prices: [defaultPrice],
};
