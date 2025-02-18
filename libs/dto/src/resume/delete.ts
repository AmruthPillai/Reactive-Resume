import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const deleteSchema = z.object({
  id: idSchema,
});

export class DeleteDto extends createZodDto(deleteSchema) {}
