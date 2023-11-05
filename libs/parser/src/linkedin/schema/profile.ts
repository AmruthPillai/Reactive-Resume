import { z } from "zod";

export const profileSchema = z.object({
  "First Name": z.string(),
  "Last Name": z.string(),
  "Maiden Name": z.string().optional(),
  Address: z.string(),
  "Birth Date": z.string(),
  Headline: z.string(),
  Summary: z.string(),
  Industry: z.string(),
  "Zip Code": z.string().optional(),
  "Geo Location": z.string(),
  "Twitter Handles": z.string(),
  Websites: z.string(),
  "Instant Messengers": z.string().optional(),
});
