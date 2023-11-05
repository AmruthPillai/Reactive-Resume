import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.password().min(6),
});

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
