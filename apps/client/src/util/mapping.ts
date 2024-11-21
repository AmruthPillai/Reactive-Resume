/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable unicorn/no-nested-ternary */

import {
  defaultBasicMapping,
  defaultResumeData,
  defaultSectionsMapping,
} from "@reactive-resume/schema";
import cloneDeep from "lodash.clonedeep";

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-explicit-any
type AnyObject = { [key: string]: any };
export const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const keysMapping = (keyStr: string) => {
  console.log(">>>???", keyStr);
  const keyArr = keyStr.split(".");
  let keyMap = {
    basics: defaultBasicMapping,
    sections: defaultSectionsMapping,
  };

  for (const key of keyArr) {
    if (key) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!keyMap) return null;
      keyMap = Array.isArray(keyMap) ? keyMap[0][key] : keyMap[key as keyof typeof keyMap];
    }
  }
  console.log("???", keyMap);
  return typeof keyMap === "object" || Array.isArray(keyMap)
    ? Array.isArray(keyMap)
      ? isObject(keyMap[0])
        ? Object.keys(keyMap[0])
        : null
      : Object.keys(keyMap)
    : null;
  // Array.isArray(keyMap) ? (isObject(keyMap[0]) ? Object.keys(keyMap[0]) : null) : Object.keys(keyMap)
};

export const extractKeys = (obj: AnyObject, prefix = "") => {
  let keys: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = [...keys, ...extractKeys(obj[key], fullKey)];
      } else if (
        Array.isArray(obj[key]) &&
        obj[key].length > 0 &&
        typeof obj[key][0] === "object"
      ) {
        keys = [...keys, ...extractKeys(obj[key][0], fullKey)];
      } else {
        keys.push(fullKey);
      }
    }
  }

  return keys;
};

export const extractKeysArray = (obj: AnyObject, prefix = "") => {
  const keys: (string | string[])[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else if (
        Array.isArray(obj[key]) &&
        obj[key].length > 0 &&
        typeof obj[key][0] === "object"
      ) {
        const arrayKeys = extractKeys(obj[key][0], fullKey);
        keys.push(arrayKeys);
      } else {
        keys.push(fullKey);
      }
    }
  }

  return keys;
};

export const getValues = (keyStr: string, data: AnyObject) => {
  const keyArr = keyStr.split(".");
  let keyMap = data;

  // console.log("WTF", keyStr, data);

  for (const key of keyArr) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!keyMap || (Array.isArray(keyMap) && keyMap.length === 0)) return null;
    // if (!keyMap) return null;
    keyMap = Array.isArray(keyMap) ? keyMap[0][key] : keyMap[key];
  }
  return keyMap;
};

export const setValues = (
  keyStr: string,
  value: string | string[] | AnyObject | AnyObject[],
  data: AnyObject,
) => {
  console.warn("II", keyStr, value, data);
  if (typeof value === "string" && !value) return;
  const keyArr = keyStr.split(".");
  let keyMap = data;
  for (let i = 0; i < keyArr.length - 1; i++) {
    keyMap = keyMap[keyArr[i]];
  }
  // eslint-disable-next-line prettier/prettier, unicorn/prefer-at, prefer-const
  let keyLast = keyMap[keyArr[keyArr.length-1]]
  if (Array.isArray(keyLast)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        keyLast.push(item);
      }
    } else {
      keyLast.push(value);
    }
  } else {
    // eslint-disable-next-line unicorn/prefer-at
    keyMap[keyArr[keyArr.length - 1]] = value;
  }
};

export const transform = (resume: AnyObject, path: string[], value: string | number): AnyObject => {
  if (path.length === 0) return resume;

  const key = path[0];

  const remainingPath = path.slice(1);

  if (remainingPath.length === 0) {
    return {
      ...resume,
      [key]: value,
    };
  }

  return {
    ...resume,
    [key]: transform(resume[key] || {}, remainingPath, value),
  };
};

export const isListItem = (data: unknown) => {
  return (
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" &&
      data !== null &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0)
  );
};

type NestedObject = { [key: string]: string | NestedObject };

export function reverseKeyValue(obj: Record<string, string>, data: AnyObject): NestedObject {
  const result: NestedObject = {};

  for (const [originalKey, value] of Object.entries(obj)) {
    const parts = value.split(".");
    const current = result;
    let i;

    for (i = 0; i < parts.length; i++) {
      const partialValue = parts.slice(0, i + 1).join(".");
      const valueData = getValues(partialValue, data);
      if (
        Array.isArray(valueData) &&
        typeof valueData[0] === "object" &&
        valueData[0] !== null &&
        !Array.isArray(valueData[0])
        // &&
        // Object.keys(valueData[0]).length === 0
      ) {
        break;
      }
    }

    if (i < parts.length) {
      const nestedKey = parts.slice(0, i + 1).join(".");
      const remainingKey = parts.slice(i + 1).join(".");

      if (!current[nestedKey]) {
        current[nestedKey] = {};
      }
      (current[nestedKey] as NestedObject)[remainingKey || value] = originalKey;
    } else {
      current[value] = originalKey;
    }
  }

  return result;
}

export const splitPathArray = (keyStr: string, data1: unknown = defaultResumeData) => {
  let data = cloneDeep(data1);
  let i = 0;
  let pathArray = keyStr.split(".").filter((str) => !!str);
  // console.log(">>>>>?--1", keyStr, data)
  for (i; i < pathArray.length; i++) {
    if (Array.isArray(data)) break;
    data = (data as AnyObject)[pathArray[i]];
    // console.log(">>>>>?--0.5", keyStr, data)
  }
  return {
    arrayPath: keyStr.split(".").slice(0, i).join("."),
    remainingPath: keyStr.split(".").slice(i).join("."),
  };
};

// export const mappingValue = (
//   data: AnyObject,
//   mappingCode: {
//     [K in keyof typeof data]: string;
//   },
// ) => {
//   const objCode = reverseKeyValue(mappingCode, data);
//   // console.warn(JSON.stringify(data))
//   let dataRtn = JSON.parse(JSON.stringify(defaultResumeData));
//   const defaultResumeMapping = {
//     basics: defaultBasicMapping,
//     sections: defaultSectionsMapping,
//   };
//   console.log("WTFH", mappingCode);
//   for (const key of Object.keys(objCode)) {
//     // console.log('>>>>>?', key)
//     if (typeof getValues(key, data) !== "string") {
//     }
//     console.log("WTH", getValues(key, data));
//     if (typeof getValues(key, data) === "string") {
//       const { remainingPath, arrayPath } = splitPathArray((objCode as AnyObject)[key]);
//       if (remainingPath) {
//         let schemaItem = getValues(arrayPath, defaultResumeMapping);
//         console.log(key, schemaItem, ">>>??");
//         (schemaItem as AnyObject)[remainingPath] = getValues(key, data);
//         setValues(arrayPath, schemaItem as AnyObject, dataRtn);
//       } else {
//         setValues((objCode as AnyObject)[key], getValues(key, data) as AnyObject[], dataRtn);
//       }
//       // console.log('>>>', remainingPath, arrayPath, getValues(key, data))
//     } else if (Array.isArray(data[key]) && typeof data[key][0] === "string") {
//       const { remainingPath, arrayPath } = splitPathArray((objCode as AnyObject)[key]);
//       if (!remainingPath) {
//         continue;
//       }
//       const items = data[key].map((item) => {
//         let schemaItem = getValues(arrayPath, defaultResumeMapping);
//         setValues(remainingPath, item, schemaItem as AnyObject);
//         return JSON.parse(JSON.stringify(schemaItem));
//       });
//       setValues(arrayPath, items, dataRtn);
//     } else if (
//       Array.isArray(data[key]) &&
//       typeof data[key][0] === "object" &&
//       data[key][0] !== null &&
//       !Array.isArray(data[key][0])
//     ) {
//       // console.log('>>>???', key, objCode[key])
//       let itemsSave = {};
//       for (const item of data[key]) {
//         let memoItem = {};
//         console.log(">>>>>?1", data[key]);
//         for (const keyIn of Object.keys(objCode[key])) {
//           const { remainingPath, arrayPath } = splitPathArray((objCode[key] as AnyObject)[keyIn]);
//           console.log(">>>>>?1.5", remainingPath);
//           if (!remainingPath) break;
//           if (!(memoItem as AnyObject)[arrayPath])
//             (memoItem as AnyObject)[arrayPath] = getValues(arrayPath, defaultResumeMapping);
//           const value = item[keyIn];
//           // (memoItem as AnyObject)[arrayPath][remainingPath] = value;
//           setValues(remainingPath, value, (memoItem as AnyObject)[arrayPath]);
//           console.log(">>>>>?2", memoItem);
//         }
//         for (const keyArray of Object.keys(memoItem)) {
//           if ((itemsSave as AnyObject)[keyArray]) {
//             (itemsSave as AnyObject)[keyArray].push(
//               JSON.parse(JSON.stringify((memoItem as AnyObject)[keyArray])),
//             );
//           } else {
//             (itemsSave as AnyObject)[keyArray] = [
//               JSON.parse(JSON.stringify((memoItem as AnyObject)[keyArray])),
//             ];
//           }
//           // console.log('>>>>>?1', item)
//         }
//         // console.log('------->>>>>?', memoItem)
//       }
//       for (const keyMap of Object.keys(itemsSave)) {
//         setValues(keyMap, (itemsSave as AnyObject)[keyMap], dataRtn);
//       }
//       // console.log(itemsSave)
//     }
//   }
//   // console.log('>>>>>?', dataRtn, mappingCode)
//   return dataRtn;
// };

export function transformingCode(obj: Record<string, string>, data: AnyObject): AnyObject {
  const result: AnyObject = {};

  for (const [originalKey, value] of Object.entries(obj)) {
    // console.log(originalKey, value)
    const parts = value.split(".");
    const current = result;
    let i;

    for (i = 0; i < parts.length; i++) {
      const partialValue = parts.slice(0, i + 1).join(".");
      const valueData = getValues(partialValue, data);
      if (
        Array.isArray(valueData) &&
        typeof valueData[0] === "object" &&
        valueData[0] !== null &&
        !Array.isArray(valueData[0])
      ) {
        break;
      }
    }

    if (i < parts.length) {
      const nestedKey = parts.slice(0, i + 1).join(".");
      const remainingKey = parts.slice(i + 1).join(".");
      // console.log(nestedKey, remainingKey)

      const { arrayPath, remainingPath } = splitPathArray(originalKey);
      if (!current[nestedKey]) {
        current[nestedKey] = [arrayPath, {}];
      }
      // (current[nestedKey] as NestedObject)[remainingKey || value] = originalKey;
      (current[nestedKey] as AnyObject[])[1][remainingKey || value] = remainingPath;
      // (current[nestedKey] as any[])[1][remainingKey || value] = originalKey;
      // console.log(current[nestedKey])
    } else {
      current[value] = originalKey;
    }
  }

  return result;
}

export const mappingValue = (
  data: AnyObject,
  mappingCode: {
    [K in keyof typeof data]: string;
  },
) => {
  try {
    // console.warn(JSON.stringify(mappingCode), JSON.stringify(data));
    //   const defaultResumeMapping = {
    //     basics: defaultBasicMapping,
    //     sections: defaultSectionsMapping,
    //   };
    //   const dataRtn = cloneDeep(defaultResumeData);
    //   const objCode = transformingCode(mappingCode, data);
    //   for (const [originalKey, value] of Object.entries(objCode)) {
    //     // console.log(value)
    //     if (typeof value === "string") {
    //       const { arrayPath, remainingPath } = splitPathArray(value);
    //       if (!remainingPath) {
    //         const valueInPath = getValues(originalKey, data) as unknown as string;
    //         setValues(value, valueInPath, dataRtn);
    //         continue;
    //       }
    //       const schemaItem = getValues(arrayPath, defaultResumeMapping) as unknown as string;
    //       const valueInPath = getValues(originalKey, data) as unknown as string;
    //       // console.log(schemaItem, valueInPath)
    //       setValues(remainingPath, valueInPath, schemaItem as unknown as AnyObject);
    //       setValues(arrayPath, schemaItem, dataRtn);
    //     } else if (Array.isArray(value)) {
    //       // console.log(originalKey, value)
    //       const schemaItem = getValues(value[0], defaultResumeMapping);
    //       const arrayValue = getValues(originalKey, data) as unknown[];
    //       const arrayItem = [];
    //       for (const itemValue of arrayValue) {
    //         let defaultItem = cloneDeep(schemaItem);
    //         for (const [rjsPath, thPath] of Object.entries(value[1])) {
    //           const valueInPath = getValues(rjsPath, itemValue as AnyObject) as unknown as string;
              // const defaultValue = getValues(
              //   // eslint-disable-next-line unicorn/prefer-spread
              //   (value[0] as string).concat(".", thPath as string),
              //   defaultResumeMapping,
              // );
    //           // console.log("???>>", rjsPath, thPath, valueInPath, defaultValue, (value[0] as string).concat(".", thPath as string))
    //           if (Array.isArray(valueInPath) && !Array.isArray(defaultValue))
    //             return defaultResumeMapping;
    //           if (Array.isArray(defaultValue) && !Array.isArray(valueInPath))
    //             return defaultResumeMapping;
    //           setValues(thPath as string, valueInPath, defaultItem as AnyObject);
    //         }
    //         arrayItem.push(cloneDeep(defaultItem));
    //       }
    //       console.warn("i", arrayItem);
    //       // console.log(">>>", value[0])
    //       // console.log("WTF1", value[0], arrayItem);
    //       setValues(value[0], arrayItem as unknown as string[], dataRtn);
    //       console.warn("III", dataRtn);
    //     }
    //   }
    //   console.log("WTF12", dataRtn);
    //   return dataRtn;
    // } catch {
    //   return defaultResumeData;
    // }

    const defaultResumeMapping = {
      basics: defaultBasicMapping,
      sections: defaultSectionsMapping,
    };

    const resultData = cloneDeep(defaultResumeData);
    const transformedMapping = transformingCode(mappingCode, data);

    for (const [originalKey, value] of Object.entries(transformedMapping)) {
      if (typeof value === "string") {
        const { arrayPath, remainingPath } = splitPathArray(value);
        const valueInPath = getValues(originalKey, data);

        if (remainingPath) {
          const schemaItem = getValues(arrayPath, defaultResumeMapping);
          setValues(remainingPath, valueInPath as unknown as string, schemaItem as AnyObject);
          setValues(arrayPath, schemaItem as AnyObject[], resultData);
        } else {
          setValues(value, valueInPath as unknown as string, resultData);
        }
      } else if (Array.isArray(value)) {
        const schemaItem = getValues(value[0], defaultResumeMapping);
        const arrayValue = getValues(originalKey, data) as unknown[];

        const arrayItem = arrayValue.map((itemValue) => {
          const defaultItem = cloneDeep(schemaItem);
          for (const [rjsPath, thPath] of Object.entries(value[1])) {
            const valueInPath = getValues(rjsPath, itemValue as AnyObject);
            const defaultValue = getValues(
              // eslint-disable-next-line unicorn/prefer-spread
              (value[0] as string).concat(".", thPath as string),
              defaultResumeMapping,
            );
            if (typeof defaultValue === "string" && Array.isArray(valueInPath))
              setValues(thPath as string, valueInPath.join("\n"), defaultItem as AnyObject);
            else
              setValues(
                thPath as string,
                valueInPath as unknown as string,
                defaultItem as AnyObject,
              );
          }
          return defaultItem;
        });
        setValues(value[0], arrayItem, resultData);
      }
    }
    return resultData;
  } catch {
    return defaultResumeData;
  }
};
