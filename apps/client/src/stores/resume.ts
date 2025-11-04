import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import type { ResumeDto } from "@reactive-resume/dto";
import type { CustomSectionGroup, SectionKey } from "@reactive-resume/schema";
import { defaultSection } from "@reactive-resume/schema";
import { removeItemInLayout } from "@reactive-resume/utils";
import _set from "lodash.set";
import type { TemporalState } from "zundo";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { debouncedUpdateResume } from "../services/resume";

type ResumeStore = {
  resume: ResumeDto;

  // Actions
  setValue: (path: string, value: unknown) => void;

  // Custom Section Actions
  addSection: () => void;
  removeSection: (sectionId: SectionKey) => void;

  // Section Collapsed/Expanded State
  collapsedSections: Record<string, boolean | undefined>;
  toggleCollapseSection: (id: string) => void;
  expandAllSections: () => void;
  collapseAllSections: () => void;
};

export const useResumeStore = create<ResumeStore>()(
  temporal(
    immer((set) => ({
      resume: {} as ResumeDto,
      setValue: (path, value) => {
        set((state) => {
          if (path === "visibility") {
            state.resume.visibility = value as "public" | "private";
          } else {
            state.resume.data = _set(state.resume.data, path, value);
          }

          void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },
      addSection: () => {
        const section: CustomSectionGroup = {
          ...defaultSection,
          id: createId(),
          name: t`Custom Section`,
          items: [],
        };

        set((state) => {
          const lastPageIndex = state.resume.data.metadata.layout.length - 1;
          state.resume.data.metadata.layout[lastPageIndex][0].push(`custom.${section.id}`);
          state.resume.data = _set(state.resume.data, `sections.custom.${section.id}`, section);

          void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },
      removeSection: (sectionId: SectionKey) => {
        if (sectionId.startsWith("custom.")) {
          const id = sectionId.split("custom.")[1];

          set((state) => {
            removeItemInLayout(sectionId, state.resume.data.metadata.layout);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete state.resume.data.sections.custom[id];

            void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
          });
        }
      },
      collapsedSections: {},
      toggleCollapseSection: (id) => {
        set((state) => {
          state.collapsedSections[id] = !state.collapsedSections[id];
        });
      },
      expandAllSections: () => {
        set((state) => {
          state.collapsedSections = {};
        });
      },
      collapseAllSections: () => {
        set((state) => {
          const collapsed: Record<string, boolean> = { basics: true };
          for (const section of Object.keys(state.resume.data.sections)) {
            collapsed[section] = true;
          }
          // Add any custom sections to the collapsed state
          for (const section of Object.keys(state.resume.data.sections.custom)) {
            collapsed[`custom.${section}`] = true;
          }
          state.collapsedSections = collapsed;
        });
      },
    })),
    {
      limit: 100,
      wrapTemporal: (fn) => devtools(fn),
      partialize: ({ resume }) => ({ resume }),
    },
  ),
);

export const useTemporalResumeStore = <T>(
  selector: (state: TemporalState<Pick<ResumeStore, "resume">>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
