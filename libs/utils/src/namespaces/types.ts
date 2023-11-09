export type Json = Record<string, unknown>;

export type LayoutLocator = { page: number; column: number; section: number };

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export type FilterKeys<T, Condition> = {
  [Key in keyof T]: T[Key] extends Condition ? Key : never;
}[keyof T];

export type SortablePayload = {
  index: number;
  containerId: string;
  items: string[];
};
