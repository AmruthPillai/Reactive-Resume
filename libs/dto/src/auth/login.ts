import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { usernameSchema } from "../user";

export const loginSchema = z
  .object({
    identifier: z.string(),
    password: z.password().min(6),
  })
  .refine(
    (value) => {
      return value.identifier.includes("@")
        ? z.string().email().parse(value.identifier)
        : usernameSchema.parse(value.identifier);
    },
    { message: "InvalidCredentials" },
  );

export class LoginDto extends createZodDto(loginSchema) {}
