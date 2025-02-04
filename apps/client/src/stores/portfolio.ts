import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { PortfolioDto } from "@reactive-resume/dto";
import { defaultPortfolioData } from "@reactive-resume/schema";
import _set from "lodash.set";
import { temporal, TemporalState } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { debouncedUpdatePortfolio } from "../services/portfolio";

type PortfolioStore = {
  portfolio: PortfolioDto & {
    data: typeof defaultPortfolioData;
  };

  // Actions
  setValue: (path: string, value: unknown) => void;

  // Custom Section Actions
  addSection: () => void;
  removeSection: (sectionId: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>()(
  temporal(
    immer((set) => ({
      portfolio: {
        id: "",
        userId: "",
        title: "",
        slug: "",
        visibility: "private",
        locked: false,
        data: defaultPortfolioData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      setValue: (path, value) => {
        set((state) => {
          if (path === "visibility") {
            state.portfolio.visibility = value as "public" | "private";
          } else {
            state.portfolio.data = _set(state.portfolio.data, path, value);
          }

          void debouncedUpdatePortfolio(JSON.parse(JSON.stringify(state.portfolio)));
        });
      },
      addSection: () => {
        const section = {
          id: createId(),
          name: t`Custom Section`,
          visible: true,
          columns: 1,
          items: [],
        };

        set((state) => {
          const lastPageIndex = state.portfolio.data.metadata.layout.length - 1;
          state.portfolio.data.metadata.layout[lastPageIndex][0].push(`custom.${section.id}`);
          state.portfolio.data = _set(
            state.portfolio.data,
            `sections.custom.${section.id}`,
            section,
          );

          void debouncedUpdatePortfolio(JSON.parse(JSON.stringify(state.portfolio)));
        });
      },
      removeSection: (sectionId: string) => {
        if (sectionId.startsWith("custom.")) {
          const id = sectionId.split("custom.")[1];

          set((state) => {
            // Remove from layout
            state.portfolio.data.metadata.layout = state.portfolio.data.metadata.layout.map(
              (page) => page.map((column) => column.filter((item) => item !== sectionId)),
            );

            // Remove section data
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete state.portfolio.data.sections.custom[id];

            void debouncedUpdatePortfolio(JSON.parse(JSON.stringify(state.portfolio)));
          });
        }
      },
    })),
    {
      limit: 100,
      wrapTemporal: (fn) => devtools(fn),
      partialize: ({ portfolio }) => ({ portfolio }),
    },
  ),
);

export const useTemporalPortfolioStore = <T>(
  selector: (state: TemporalState<Pick<PortfolioStore, "portfolio">>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(usePortfolioStore.temporal, selector, equality);
