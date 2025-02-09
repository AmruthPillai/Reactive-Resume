import { PortfolioTemplate } from "./types";
import { MinimalTemplate } from "./minimal";
// import { ModernTemplate } from "./modern";
// import { ProfessionalTemplate } from "./professional";

export const portfolioTemplates: Record<string, PortfolioTemplate> = {
  minimal: {
    id: "minimal",
    name: "Minimal",
    component: MinimalTemplate,
  },
// modern: {
 //   id: "modern",
  //  name: "Modern",
   // component: ModernTemplate,
 // },
 // professional: {
   // id: "professional",
   // name: "Professional",
    //component: ProfessionalTemplate,
 // }, 
};

export const getPortfolioTemplate = (id: string) => {
  return portfolioTemplates[id]?.component;
};
