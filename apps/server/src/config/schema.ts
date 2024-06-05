import { z } from "nestjs-zod/z";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),

  // Ports
  PORT: z.coerce.number().default(3000),

  // URLs
  PUBLIC_URL: z.string().url(),
  STORAGE_URL: z.string().url(),

  // Database (Prisma)
  DATABASE_URL: z.string().url().startsWith("postgresql://"),

  // Authentication Secrets
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  // Browser
  CHROME_TOKEN: z.string(),
  CHROME_URL: z.string().url(),
  CHROME_IGNORE_HTTPS_ERRORS: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),

  // Mail Server
  MAIL_FROM: z.string().includes("@").optional().default("noreply@localhost"),
  SMTP_URL: z
    .string()
    .url()
    .refine((url) => url.startsWith("smtp://") || url.startsWith("smtps://"))
    .optional(),

  // Storage
  STORAGE_ENDPOINT: z.string(),
  STORAGE_PORT: z.coerce.number(),
  STORAGE_REGION: z.string().default("us-east-1"),
  STORAGE_BUCKET: z.string(),
  STORAGE_ACCESS_KEY: z.string(),
  STORAGE_SECRET_KEY: z.string(),
  STORAGE_USE_SSL: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),
  STORAGE_SKIP_BUCKET_CHECK: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),

  // Crowdin (Optional)
  CROWDIN_PROJECT_ID: z.coerce.number().optional(),
  CROWDIN_PERSONAL_TOKEN: z.string().optional(),

  // Feature Flags (Optional)
  DISABLE_SIGNUPS: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),
  DISABLE_EMAIL_AUTH: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),

  // GitHub (OAuth)
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_CALLBACK_URL: z.string().url().optional(),

  // Google (OAuth)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().url().optional(),
});

export type Config = z.infer<typeof configSchema>;
