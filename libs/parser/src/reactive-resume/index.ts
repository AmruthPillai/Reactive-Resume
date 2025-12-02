import type { ResumeData } from "@reactive-resume/schema";
import { resumeDataSchema } from "@reactive-resume/schema";
import type { Json } from "@reactive-resume/utils";
import type { Schema } from "zod";

import type { Parser } from "../interfaces/parser";

export class ReactiveResumeParser implements Parser<Json, ResumeData> {
  schema: Schema;

  constructor() {
    this.schema = resumeDataSchema;
  }

  readFile(file: File): Promise<Json> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        try {
          const result = JSON.parse(reader.result as string) as Json;
          resolve(result);
        } catch {
          reject(new Error("Failed to parse JSON"));
        }
      });

      reader.addEventListener("error", () => {
        reject(new Error("Failed to read the file"));
      });

      reader.readAsText(file);
    });
  }

  validate(data: Json) {
    return this.schema.parse(data) as ResumeData;
  }

  convert(data: ResumeData) {
    return data;
  }
}
