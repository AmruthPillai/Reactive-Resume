import { z } from "zod";

export const skillSchema = z.object({
  Name: z.string(),
});
