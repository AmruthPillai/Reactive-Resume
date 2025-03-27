import { z } from "zod";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),

  // Ports
  PORT: z.coerce.number().default(3000),

  // URLs
  PUBLIC_URL: z.string().url(),

  // Browser (for PDF generation)
  CHROME_TOKEN: z.string(),
  CHROME_URL: z.string().url(),
  CHROME_IGNORE_HTTPS_ERRORS: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),

  // Supabase Configuration
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  // Database (Supabase)
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
});

export type Config = z.infer<typeof configSchema>;
