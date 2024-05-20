import dayjs from "dayjs";

export const sortByDate = <T>(a: T, b: T, key: keyof T, desc = true) => {
  if (!a[key] || !b[key]) return 0;
  if (!(a[key] instanceof Date) || !(b[key] instanceof Date)) return 0;

  if (dayjs(a[key] as Date).isSame(dayjs(b[key] as Date))) return 0;
  if (desc) return dayjs(a[key] as Date).isBefore(dayjs(b[key] as Date)) ? 1 : -1;
  else return dayjs(a[key] as Date).isBefore(dayjs(b[key] as Date)) ? -1 : 1;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepSearchAndParseDates = (obj: any, dateKeys: string[]): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return obj;
  }

  for (const key of keys) {
    let value = obj[key];

    if (dateKeys.includes(key) && typeof value === "string") {
      const parsedDate = new Date(value);
      if (!Number.isNaN(parsedDate.getTime())) {
        value = parsedDate;
      }
    }

    obj[key] = deepSearchAndParseDates(value, dateKeys);
  }

  return obj;
};
