import { z } from "zod";

import { priceSchema } from "./price";

// Schema
export const productSchema = z.object({
  id: z.string(),
  active: z.boolean().default(false),
  name: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  metadata: z.record(z.string(), z.string()),

  prices: z.array(priceSchema),
});

// Type
export type Product = z.infer<typeof productSchema>;
