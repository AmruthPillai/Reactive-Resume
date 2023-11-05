import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const messageSchema = z.object({ message: z.string() });

export class MessageDto extends createZodDto(messageSchema) {}
