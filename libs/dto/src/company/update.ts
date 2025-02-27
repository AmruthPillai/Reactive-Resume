import { createZodDto } from "nestjs-zod/dto";

import { companySchema } from "./company";

export const updateCompanySchema = companySchema.partial();

export class UpdateCompanyDto extends createZodDto(updateCompanySchema) {}
