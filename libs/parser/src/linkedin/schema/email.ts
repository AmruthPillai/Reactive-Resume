import { z } from "zod";

export const emailSchema = z.object({
  "Email Address": z.string().email(),
  Confirmed: z.enum(["Yes", "No"]),
  Primary: z.enum(["Yes", "No"]),
  "Updated On": z.string(),
});
