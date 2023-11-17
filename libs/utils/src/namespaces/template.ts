export const templatesList = [
  "azurill",
  "bronzor",
  "chikorita",
  "ditto",
  "kakuna",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;

export type Template = (typeof templatesList)[number];
