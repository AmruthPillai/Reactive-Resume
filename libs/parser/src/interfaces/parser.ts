import type { ResumeData } from "@reactive-resume/schema";
import type { ZodDto } from "nestjs-zod/dto";
import type { Schema } from "zod";

/**
 * Interface for resume data parsers that can read, validate, and convert various formats.
 *
 * @template Data - The raw data format read from files (e.g., JSZip for LinkedIn, Json for JSON Resume)
 * @template T - The validated data structure (e.g., LinkedIn, JsonResume)
 * @template Result - The final converted format (defaults to ResumeData)
 *
 * @example
 * ```typescript
 * class MyParser implements Parser<JSZip, MyFormat, ResumeData> {
 *   readFile(file: File): Promise<JSZip> {
 *     return JSZip.loadAsync(file);
 *   }
 *
 *   validate(data: JSZip): MyFormat {
 *     // Validate and parse the data
 *     return parsedData;
 *   }
 *
 *   convert(data: MyFormat): ResumeData {
 *     // Convert to Reactive Resume format
 *     return resumeData;
 *   }
 * }
 * ```
 */
export type Parser<Data = unknown, T = ZodDto, Result = ResumeData> = {
  /** Optional Zod schema for validation */
  schema?: Schema;

  /**
   * Reads and parses a file into the raw data format.
   * @param file - The uploaded file to process
   * @returns Promise resolving to the parsed raw data
   */
  readFile(file: File): Promise<Data>;

  /**
   * Validates and transforms raw data into a structured format.
   * @param data - The raw data from readFile()
   * @returns The validated and structured data
   */
  validate(data: Data): T | Promise<T>;

  /**
   * Converts validated data into the final result format.
   * @param data - The validated data from validate()
   * @returns The converted data in the target format
   */
  convert(data: T): Result | Promise<Result>;
};
