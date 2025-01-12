import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const updatePasswordSchema = z.object({
  password: z.string().min(6),
});

export class UpdatePasswordDto extends createZodDto(updatePasswordSchema) {}
