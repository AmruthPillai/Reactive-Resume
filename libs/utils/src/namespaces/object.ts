export const exclude = <T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> => {
  if (!object) return object;

  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
};
