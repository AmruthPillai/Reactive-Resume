import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const accomplishmentSchema = itemSchema.extend({
    name: z.string().min(1),
    summary: z.string(),
});

// Type
export type Accomplishment = z.infer<typeof accomplishmentSchema>;

// Defaults
export const defaultAccomplishment: Accomplishment = {
    ...defaultItem,
    name: "",
    summary: "",
};
