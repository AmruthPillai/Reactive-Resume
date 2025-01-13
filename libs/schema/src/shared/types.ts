export type FilterKeys<T, Condition> = {
  [Key in keyof T]: T[Key] extends Condition ? Key : never;
}[keyof T];
