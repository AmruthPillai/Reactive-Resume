import { PortfolioData, ResumeData, SectionKey } from "@reactive-resume/schema";

export type TemplateProps = {
  columns: SectionKey[][];
  isFirstPage?: boolean;
};

export type ArtboardMessage =
  | { type: "SET_RESUME"; payload: ResumeData }
  | { type: "SET_PORTFOLIO"; payload: PortfolioData }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "PAGE_LOADED"; payload: { width: number; height: number } };
