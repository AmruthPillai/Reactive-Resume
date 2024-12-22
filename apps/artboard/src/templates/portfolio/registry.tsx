// artboard/src/templates/portfolio/registry.tsx
import { PortfolioTemplate } from "./types";
import { MinimalTemplate } from "./minimal";
// import { ModernTemplate } from "./modern";
// import { CreativeTemplate } from "./creative";

export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    preview: "/templates/portfolio/minimal.jpg",
    component: MinimalTemplate,
  },
//   {
//     id: "modern",
//     name: "Modern",
//     preview: "/templates/portfolio/modern.jpg",
//     component: ModernTemplate,
//   },
//   {
//     id: "creative",
//     name: "Creative",
//     preview: "/templates/portfolio/creative.jpg",
//     component: CreativeTemplate,
//   },
];

export const getPortfolioTemplate = (id: string) => {
  return portfolioTemplates.find((template) => template.id === id) ?? portfolioTemplates[0];
};
