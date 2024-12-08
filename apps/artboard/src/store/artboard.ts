// artboard/src/store/artboard.ts
import { PortfolioData, ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";

type ArtboardStore = {
  mode: "resume" | "portfolio";
  resume: ResumeData;
  portfolio: PortfolioData;
  setResume: (resume: ResumeData) => void;
  setPortfolio: (portfolio: PortfolioData) => void;
  setMode: (mode: "resume" | "portfolio") => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  mode: "resume",
  resume: null as unknown as ResumeData,
  portfolio: null as unknown as PortfolioData,
  setResume: (resume) => set({ resume }),
  setPortfolio: (portfolio) => set({ portfolio }),
  setMode: (mode) => set({ mode }),
}));
