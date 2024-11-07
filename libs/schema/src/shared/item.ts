import { z } from "zod";

import { idSchema } from "./id";
import { createId } from "@paralleldrive/cuid2";

// Schema
export const itemSchema = z.object({
  id: idSchema,
  visible: z.boolean(),
});

// Type
export type Item = z.infer<typeof itemSchema>;

// Defaults
export const defaultItem: Item = {
  id: createId(),
  visible: true,
};
