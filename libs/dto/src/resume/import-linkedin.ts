import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const importLinkedinSchema = z.object({
  linkedinURL: z.string().url(),
});

export class ImportLinkedinDto extends createZodDto(importLinkedinSchema) {}
