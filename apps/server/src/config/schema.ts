import { z } from "nestjs-zod/z";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),

  // Ports
  PORT: z.coerce.number().default(3000),

  // Client URL (only for development environments)
  __DEV__CLIENT_URL: z.string().url().optional(),

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

  // Mail Server
  MAIL_FROM: z.string().includes("@").optional().default("noreply@localhost"),
  SMTP_URL: z.string().url().startsWith("smtp://").optional(),

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
  STORAGE_SKIP_CREATE_BUCKET: z
    .string()
    .default("false")
    .transform((s) => s !== "false" && s !== "0"),

  // Redis
  REDIS_URL: z.string().url().startsWith("redis://").optional(),

  // Sentry
  VITE_SENTRY_DSN: z.string().url().startsWith("https://").optional(),

  // Crowdin (Optional)
  CROWDIN_PROJECT_ID: z.coerce.number().optional(),
  CROWDIN_PERSONAL_TOKEN: z.string().optional(),

  // Email (Optional)
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

  // LinkedIn (OAuth)
  LINKEDIN_CLIENT_ID: z.string().optional(),
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  LINKEDIN_CALLBACK_URL: z.string().url().optional(),

  // PALM api
  PALM_API_KEY: z.string(),
  PALM_MODEL_NAME: z.string(),
});

export type Config = z.infer<typeof configSchema>;
