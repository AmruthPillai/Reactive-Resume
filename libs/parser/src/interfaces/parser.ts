import { ResumeData } from "@reactive-resume/schema";
import { ZodDto } from "nestjs-zod/dto";
import { Schema } from "zod";

export interface Parser<Data = unknown, T = ZodDto, Result = ResumeData> {
  schema?: Schema;

  readFile(file: File): Promise<Data>;

  validate(data: Data): T | Promise<T>;

  convert(data: T): Result | Promise<Result>;
}
