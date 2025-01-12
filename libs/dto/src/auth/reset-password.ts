import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
