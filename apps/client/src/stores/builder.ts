import { ImperativePanelHandle } from "react-resizable-panels";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Sheet = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type Panel = {
  isDragging: boolean;
  ref: ImperativePanelHandle | null;
  setRef: (ref: ImperativePanelHandle | null) => void;
  setDragging: (dragging: boolean) => void;
};

interface BuilderState {
  transform: {
    ref: Omit<ReactZoomPanPinchRef, "instance"> | null;
    setRef: (ref: Omit<ReactZoomPanPinchRef, "instance"> | null) => void;
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
    transform: {
      ref: null,
      setRef: (ref) => {
        set((state) => {
          state.transform.ref = ref;
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
