import { PortfolioData } from "@reactive-resume/schema";

export interface PortfolioTemplateProps {
  data: PortfolioData;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  component: React.ComponentType<PortfolioTemplateProps>;
}
