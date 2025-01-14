import type { ResumeData } from "@reactive-resume/schema";
import type { ZodDto } from "nestjs-zod/dto";
import type { Schema } from "zod";

export type Parser<Data = unknown, T = ZodDto, Result = ResumeData> = {
  schema?: Schema;

  readFile(file: File): Promise<Data>;

  validate(data: Data): T | Promise<T>;

  convert(data: T): Result | Promise<Result>;
};
