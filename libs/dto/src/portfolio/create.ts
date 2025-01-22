import { kebabCase } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const createPortfolioSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).transform(kebabCase).optional(),
  visibility: z.enum(["public", "private"]).default("private"),
});

export class CreatePortfolioDto extends createZodDto(createPortfolioSchema) {}
