import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const forgotPasswordSchema = z.object({ email: z.string().email() });

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}
