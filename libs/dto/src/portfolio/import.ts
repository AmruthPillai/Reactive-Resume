import { portfolioDataSchema } from "@reactive-resume/schema";
import { kebabCase } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const importPortfolioSchema = z.object({
  title: z.string().optional(),
  slug: z.string().min(1).transform(kebabCase).optional(),
  visibility: z.enum(["public", "private"]).default("private").optional(),
  data: portfolioDataSchema,
});

export class ImportPortfolioDto extends createZodDto(importPortfolioSchema) {}
