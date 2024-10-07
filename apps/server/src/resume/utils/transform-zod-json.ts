import { ResumeData, resumeDataSchema } from "@reactive-resume/schema";
// import { resumeDataSchema } from "@reactive-resume/schema";
import { ZodIssue, ZodIssueCode } from "zod";

import { AnyObject } from "../types";
import { transformInvalidType } from "./invalid-type";
import { transformTooSmall } from "./too-small";

function capitalizeFirstLetter(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const transformZodJson = (resume: unknown) => {
  // console.log(resume)
  const result = resumeDataSchema.safeParse(resume);
  let resumeData = resume;
  // console.log('>>>??',defaultResumeHandler);
  console.log(result.error?.errors);
  // const result = tester.safeParse(test);
  if (!result.success) {
    // return result.error
    for (const error of result.error.errors) {
      // console.log(error);
      resumeData = transformByError(resumeData, error);
    }
    // console.log(result.error.errors[0]);
    // resumeData = transformByError(resume, result.error.errors[result.error.errors.length-1]);
    // console.log(resumeData);
  }
  // resumeData = resumeData as ResumeData;
  const test = resumeData as ResumeData;
  const sections = test.sections;
  for (const section of Object.keys(sections)) {
    if (section in test.sections) {
      // const currentSection = test.sections[section];
      // làm gì đó với currentSection
    }
  }
  console.log({
    ...test,
    section: test.sections,
  });
  // const result2 = resumeDataSchema.safeParse(resumeData);
  // console.log('?>>', result2.error?.errors);
  // if (!result2.success) return result2.error;
  return resumeData;
};

export const transformByError = (resume: unknown, error: ZodIssue) => {
  switch (error.code) {
    case ZodIssueCode.invalid_type:
    case ZodIssueCode.invalid_enum_value: {
      return transformInvalidType(resume as AnyObject, error.path);
    }
    case ZodIssueCode.too_small: {
      // return resume;
      return transformTooSmall(resume as AnyObject, error.path, error.minimum as number);
    }
    default: {
      return transformInvalidType(resume as AnyObject, error.path);
    }
  }
};
