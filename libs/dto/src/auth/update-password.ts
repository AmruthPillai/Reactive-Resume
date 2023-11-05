import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const updatePasswordSchema = z.object({
  password: z.string().min(6),
});

export class UpdatePasswordDto extends createZodDto(updatePasswordSchema) {}
