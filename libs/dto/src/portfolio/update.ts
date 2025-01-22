import { createZodDto } from "nestjs-zod/dto";

import { portfolioSchema } from "./portfolio";

export const updatePortfolioSchema = portfolioSchema.partial();

export class UpdatePortfolioDto extends createZodDto(updatePortfolioSchema) {}
