import { z } from "zod";

export const profileSchema = z.object({
  "First Name": z.string().default("John"),
  "Last Name": z.string().default("Doe"),
  "Maiden Name": z.string().optional(),
  Address: z.string().default("123 Example Street, Somewhere, USA"),
  "Birth Date": z.string().default("January 1st, 1970"),
  Headline: z.string().default(""),
  Summary: z.string().default(""),
  Industry: z.string().default(""),
  "Zip Code": z.string().optional(),
  "Geo Location": z.string().default("Somewhere"),
  "Twitter Handles": z.string().default("@test"),
  Websites: z.string().default("https://www.example.com"),
  "Instant Messengers": z.string().optional(),
});
