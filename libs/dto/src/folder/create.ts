import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string().min(1),
});

export class CreateFolderDto extends createZodDto(createFolderSchema) {}
