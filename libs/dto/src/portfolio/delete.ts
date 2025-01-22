import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const deletePortfolioSchema = z.object({
  id: idSchema,
});

export class DeletePortfolioDto extends createZodDto(deletePortfolioSchema) {}
