import { resumeDataSchema } from "@reactive-resume/schema";
import { ZodIssue, ZodIssueCode } from "zod";

import { AnyObject } from "../types";
import { transformInvalidType } from "./invalid-type";

export const transformZodJson = (resume: unknown) => {
  const result = resumeDataSchema.safeParse(resume);
  let resumeData = resume;
  // const result = tester.safeParse(test);
  if (!result.success) {
    for (const error of result.error.errors) {
      resumeData = transformByError(resume, error);
    }
  }
  return resumeData;
};

export const transformByError = (resume: unknown, error: ZodIssue) => {
  switch (error.code) {
    case ZodIssueCode.invalid_type:
    case ZodIssueCode.invalid_enum_value: {
      return transformInvalidType(resume as AnyObject, error.path);
    }
    default: {
      return transformInvalidType(resume as AnyObject, error.path);
    }
  }
};
