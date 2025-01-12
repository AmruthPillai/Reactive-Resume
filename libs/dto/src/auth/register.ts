import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

export const registerSchema = userSchema
  .pick({ name: true, email: true, username: true, locale: true })
  .extend({ password: z.string().min(6) });

export class RegisterDto extends createZodDto(registerSchema) {}
