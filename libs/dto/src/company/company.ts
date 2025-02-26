import { idSchema } from "@reactive-resume/schema";
import { z } from "zod";
import { createZodDto } from "nestjs-zod/dto";
import { dateSchema } from "@reactive-resume/utils";

export const companySchema = z.object({
  id: idSchema,
  name: z.string(),
  ownerId: idSchema,
  updatedAt: dateSchema,
});

export class CompanyDto extends createZodDto(companySchema) {}
