import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

const updateFolderSchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(1).optional(),
});

export class UpdateFolderDto extends createZodDto(updateFolderSchema) {}
