// artboard/src/templates/portfolio/types.ts
import { PortfolioData } from "@reactive-resume/schema";

export interface PortfolioTemplateProps {
    data: PortfolioData;
    columns?: number;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    children?: React.ReactNode;  
    className?: string;         
  }

export interface PortfolioTemplate {
  id: string;
  name: string;
  preview: string; // Path to preview image
  component: React.FC<PortfolioTemplateProps>;
}
