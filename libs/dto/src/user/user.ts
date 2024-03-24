import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { secretsSchema } from "../secrets";

export const usernameSchema = z
  .string()
  .min(3)
  .max(255)
  .regex(/^[a-z0-9._-]+$/, {
    message:
      "Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores.",
  });

export const userSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(255),
  picture: z.literal("").or(z.null()).or(z.string().url()),
  username: usernameSchema,
  email: z.string().email(),
  locale: z.string().default("en-US"),
  emailVerified: z.boolean().default(false),
  twoFactorEnabled: z.boolean().default(false),
  provider: z.enum(["email", "github", "google", "linkedin"]).default("email"),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
  // The customer's billing address, stored in JSON format.
  billingAddress: z.json().optional(),
  // Stores your customer's payment instruments.
  paymentMethod: z.json().optional(),
});

export class UserDto extends createZodDto(userSchema) {}

export const userWithSecretsSchema = userSchema.merge(z.object({ secrets: secretsSchema }));

export class UserWithSecrets extends createZodDto(userWithSecretsSchema) {}
