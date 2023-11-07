import { ImperativePanelHandle } from "react-resizable-panels";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Sheet = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type Panel = {
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
  ref: ImperativePanelHandle | null;
  setRef: (ref: ImperativePanelHandle | null) => void;
};

interface BuilderState {
  frame: {
    ref: HTMLIFrameElement | null;
    setRef: (ref: HTMLIFrameElement | null) => void;
  };
  sheet: {
    left: Sheet;
    right: Sheet;
  };
  panel: {
    left: Panel;
    right: Panel;
  };
}

interface BuilderActions {
  toggle: (side: "left" | "right") => void;
}

export const useBuilderStore = create<BuilderState & BuilderActions>()(
  immer((set) => ({
    frame: {
      ref: null,
      setRef: (ref) => {
        set((state) => {
          // @ts-expect-error Unable to set ref type
          state.frame.ref = ref;
        });
      },
    },
    sheet: {
      left: {
        open: false,
        setOpen: (open) => {
          set((state) => {
            state.sheet.left.open = open;
          });
        },
      },
      right: {
        open: false,
        setOpen: (open) => {
          set((state) => {
            state.sheet.right.open = open;
          });
        },
      },
    },
    panel: {
      left: {
        ref: null,
        isDragging: false,
        setRef: (ref) => {
          set((state) => {
            state.panel.left.ref = ref;
          });
        },
        setDragging: (dragging) => {
          set((state) => {
            state.panel.left.isDragging = dragging;
          });
        },
      },
      right: {
        ref: null,
        isDragging: false,
        setRef: (ref) => {
          set((state) => {
            state.panel.right.ref = ref;
          });
        },
        setDragging: (dragging) => {
          set((state) => {
            state.panel.right.isDragging = dragging;
          });
        },
      },
    },
    toggle: (side) => {
      set((state) => {
        const panelRef = state.panel[side].ref;

        if (panelRef) {
          const collapsed = panelRef.getCollapsed();
          collapsed ? panelRef.expand() : panelRef.collapse();
        } else {
          state.sheet[side].open = !state.sheet[side].open;
        }
      });
    },
  })),
);
