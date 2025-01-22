import { PortfolioData, ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";

type ArtboardStore = {
  mode: "resume" | "portfolio";
  resume: ResumeData;
  portfolio: PortfolioData;
  setMode: (mode: "resume" | "portfolio") => void;
  setResume: (resume: ResumeData) => void;
  setPortfolio: (portfolio: PortfolioData) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  mode: "resume",
  resume: null as unknown as ResumeData,
  portfolio: null as unknown as PortfolioData,
  setMode: (mode) => {
    set({ mode });
  },
  setResume: (resume) => {
    set({ resume });
  },
  setPortfolio: (portfolio) => {
    set({ portfolio });
  },
}));
