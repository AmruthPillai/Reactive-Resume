import { defaultResumeData } from "@reactive-resume/schema";

import { AnyObject } from "./../types/index";

export const transformInvalidType = (
  resume: AnyObject,
  path: (string | number)[],
  defaultData: AnyObject = defaultResumeData,
): AnyObject => {
  if (path.length === 0) return resume;
  // console.log(resume)

  const key = path[0];
  const remainingPath = path.slice(1);

  if (remainingPath.length === 0) {
    return {
      ...resume,
      [key]: (defaultResumeData as AnyObject)[key],
    };
  }

  return {
    ...resume,
    [key]: transformInvalidType(resume[key] || {}, remainingPath, defaultData[key]),
  };
};
