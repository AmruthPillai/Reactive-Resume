import type { SectionDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SectionsState = {
  sections: SectionDto[] | null;
};

type SectionsActions = {
  setSections: (sections: SectionDto[] | null) => void;
};

export const useSectionsStore = create<SectionsState & SectionsActions>()(
  persist(
    (set) => ({
      sections: null,
      setSections: (sections) => {
        set({ sections });
      },
    }),
    { name: "sections" },
  ),
);
