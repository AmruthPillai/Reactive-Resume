import { PortfolioTemplate } from "./template";

export type PortfolioConfig = {
  template: PortfolioTemplate;
  layout: {
    type: "grid" | "masonry" | "list";
    columns: number;
    spacing: number;
  };
  sections: string[];
};

export const defaultPortfolioConfig: PortfolioConfig = {
  template: "modern",
  layout: {
    type: "grid",
    columns: 2,
    spacing: 16,
  },
  sections: ["about", "projects", "skills", "contact"],
};

export const getPortfolioTemplateName = (template: PortfolioTemplate): string => {
  const names: Record<PortfolioTemplate, string> = {
    minimal: "Minimal Portfolio",
    modern: "Modern Portfolio",
    professional: "Professional Portfolio",
  };

  return names[template];
};
