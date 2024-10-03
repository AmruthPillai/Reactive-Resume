import { defaultResumeHandler } from "libs/schema/src/handler";

import { AnyObject } from "./../types/index";

function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export const transformInvalidType = (
  resume: AnyObject,
  path: (string | number)[],
  defaultData: AnyObject = defaultResumeHandler,
  // defaultData: AnyObject = defaultResumeData,
): AnyObject => {
  // console.log("<><<><><???? DEFA", path, defaultData);
  if (path.length === 0) return resume;
  // console.log(resume)

  const key = path[0];
  // console.log(key);
  const remainingPath = path.slice(1);

  if (typeof key === "number") {
    const arrayCopy = isArray(resume) ? [...resume] : [];
    // console.log(
    //   ">>>ARRAY",
    //   arrayCopy,
    //   ">>>DEFA",
    //   ">>>KEY",
    //   key,
    //   "ARRAY[KEY]",
    //   arrayCopy[key],
    //   defaultData,
    //   ">>>Pat",
    //   remainingPath,
    //   ">>>DEFAKEY",
    //   defaultData,
    // );
    arrayCopy[key] = transformInvalidType(arrayCopy[key] || {}, remainingPath, defaultData);
    return arrayCopy;
  }

  if (remainingPath.length === 0) {
    // console.log((defaultResumeData as AnyObject)[key], defaultData);
    return {
      ...resume,
      [key]: defaultData[key],
    };
  }

  return {
    ...resume,
    [key]: transformInvalidType(resume[key] || {}, remainingPath, defaultData[key]),
  };
};
