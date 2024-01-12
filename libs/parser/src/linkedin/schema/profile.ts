import { z } from "zod";

export const profileSchema = z.object({
  "First Name": z.string().default("John"),
  "Last Name": z.string().default("Doe"),
  "Maiden Name": z.string().optional(),
  Address: z.string().default("111 Example Street"),
  "Birth Date": z.string().default("January 1st, 1970"),
  Headline: z.string().default("An Awesome Person"),
  Summary: z.string().default("Look at this awesome person"),
  Industry: z.string().default("Resume Building"),
  "Zip Code": z.string().optional(),
  "Geo Location": z.string().default("Somewhere"),
  "Twitter Handles": z.string().default("@test"),
  Websites: z.string().default("example.com"),
  "Instant Messengers": z.string().optional(),
});
