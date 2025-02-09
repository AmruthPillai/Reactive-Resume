export const templatesList = [
  "azurill",
  "bronzor",
  "chikorita",
  "ditto",
  "gengar",
  "glalie",
  "kakuna",
  "leafish",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;
export const portfolioTemplatesList = ["minimal", "modern", "professional"] as const;

export type Template = (typeof templatesList)[number];
export type PortfolioTemplate = (typeof portfolioTemplatesList)[number];

export const isPortfolioTemplate = (template: string): template is PortfolioTemplate => {
  return portfolioTemplatesList.includes(template as PortfolioTemplate);
};
