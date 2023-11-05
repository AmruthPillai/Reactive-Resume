import { z } from "nestjs-zod/z";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Ports
  PORT: z.coerce.number().default(3000),

  // Client Port & URL (only for development environments)
  __DEV__CLIENT_PORT: z.coerce.number().default(5173),
  __DEV__CLIENT_URL: z.string().url().default("http://localhost:5173"),

  // URLs
  PUBLIC_URL: z.string().url(),
  STORAGE_URL: z.string().url(),
  CHROME_URL: z.string().url(),

  // Database (Prisma)
  DATABASE_URL: z.string().url().startsWith("postgresql://"),

  // Authentication Secrets
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  // Browser
  CHROME_TOKEN: z.string(),

  // Mail Server
  SMTP_URL: z.string().url().startsWith("smtp://").optional(),

  // Storage
  STORAGE_ENDPOINT: z.string(),
  STORAGE_PORT: z.coerce.number(),
  STORAGE_REGION: z.string().default("us-east-1"),
  STORAGE_BUCKET: z.string(),
  STORAGE_ACCESS_KEY: z.string(),
  STORAGE_SECRET_KEY: z.string(),

  // Redis
  REDIS_URL: z.string().url().startsWith("redis://").optional(),

  // Sentry
  SENTRY_DSN: z.string().url().optional(),

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
