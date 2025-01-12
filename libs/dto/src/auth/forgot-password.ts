import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const forgotPasswordSchema = z.object({ email: z.string().email() });

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}
