import type { ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";

export type ArtboardStore = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
};

/**
 * Read resume data from localStorage synchronously during store initialization.
 * This ensures the resume is available on the very first render, avoiding a null
 * state that would cause the Providers component to return null and break
 * Puppeteer's PDF generation (which waits for [data-page="1"] element).
 */
const getInitialResume = (): ResumeData => {
  if (typeof window === "undefined") {
    return null as unknown as ResumeData;
  }

  const storedData = window.localStorage.getItem("resume");
  if (storedData) {
    try {
      return JSON.parse(storedData) as ResumeData;
    } catch {
      // Invalid JSON, fall through to null
    }
  }

  return null as unknown as ResumeData;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  resume: getInitialResume(),
  setResume: (resume) => {
    set({ resume });
  },
}));
