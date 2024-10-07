import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().gt(0).safe().optional().default(1),
  pageSize: z.coerce.number().int().positive().gt(0).safe().optional().default(10),
  searchKey: z.string().optional(),
  value: z.string().optional(),
});

export class PaginationDto extends createZodDto(paginationSchema) {}
