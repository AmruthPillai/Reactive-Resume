export type TemplateKey =
  | "onyx"
  | "kakuna"
  | "rhyhorn"
  | "azurill"
  | "ditto"
  | "chikorita"
  | "bronzor"
  | "pikachu";

export type Template = { id: TemplateKey; name: string };

export const templatesList: Template[] = [
  {
    id: "onyx",
    name: "Onyx",
  },
  {
    id: "kakuna",
    name: "Kakuna",
  },
  {
    id: "rhyhorn",
    name: "Rhyhorn",
  },
  {
    id: "azurill",
    name: "Azurill",
  },
  {
    id: "ditto",
    name: "Ditto",
  },
  {
    id: "chikorita",
    name: "Chikorita",
  },
  {
    id: "bronzor",
    name: "Bronzor",
  },
  {
    id: "pikachu",
    name: "Pikachu",
  },
];
