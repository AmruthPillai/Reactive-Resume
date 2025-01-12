import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const messageSchema = z.object({ message: z.string() });

export class MessageDto extends createZodDto(messageSchema) {}
