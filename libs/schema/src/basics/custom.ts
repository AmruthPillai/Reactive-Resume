import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string().cuid2(),
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});

export type CustomField = z.infer<typeof customFieldSchema>;

export const defaultCustomBasic: CustomField = {
  id: createId(),
  icon: "",
  name: "",
  value: "",
};

export const defaultCustomBasicMapping: Omit<CustomField, "id"> = {
  icon: "",
  name: "",
  value: "",
};
