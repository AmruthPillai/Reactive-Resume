import { defaultResumeHandler } from "libs/schema/src/handler";

import { AnyObject } from "./../types/index";
import { createId } from "@paralleldrive/cuid2";

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
    arrayCopy[key] = transformInvalidType(arrayCopy[key] || {}, remainingPath, defaultData);
    return arrayCopy;
  }

  if (remainingPath.length === 0) {
    return {
      ...resume,
      [key]: defaultData[key],
    };
  }

  return {
    ...resume,
    [key]: transformInvalidType(
      resume[key] || {},
      remainingPath,
      key === "items" ? defaultData.itemsDefault : (key === "id" ? createId() : defaultData[key]),
    ),
  };
};
