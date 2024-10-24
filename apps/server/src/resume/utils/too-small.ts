import { AnyObject } from "./../types/index";

function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export const transformTooSmall = (
  resume: AnyObject,
  path: (string | number)[],
  minLength: number,
): AnyObject => {
  if (path.length === 0) return resume;

  const key = path[0];
  const remainingPath = path.slice(1);

  if (typeof key === "number") {
    const arrayCopy = isArray(resume) ? [...resume] : [];
    arrayCopy[key] = transformTooSmall(arrayCopy[key] || {}, remainingPath, minLength);
    return arrayCopy;
  }

  if (remainingPath.length === 0) {
    const defaultStr = "?";
    return {
      ...resume,
      [key]: defaultStr.repeat(minLength),
    };
  }

  return {
    ...resume,
    [key]: transformTooSmall(resume[key] || {}, remainingPath, minLength),
  };
};
