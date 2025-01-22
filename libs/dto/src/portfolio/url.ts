import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const urlSchemaP = z.object({
  url: z.string().url(),
});

export class UrlDtoP extends createZodDto(urlSchemaP) {}
