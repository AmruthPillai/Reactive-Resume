import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1),
});

export class CreateCompanyDto extends createZodDto(createCompanySchema){}
