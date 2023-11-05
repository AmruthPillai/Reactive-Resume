import { idSchema } from "@reactive-resume/schema";
import { z } from "nestjs-zod/z";

export const payloadSchema = z.object({
  id: idSchema,
  isTwoFactorAuth: z.boolean().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;
