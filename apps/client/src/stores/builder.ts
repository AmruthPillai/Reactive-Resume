import { BuilderType } from "@reactive-resume/schema";
import { Builder, ResumeSections } from "@reactive-resume/utils";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Sheet = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type ActiveSection = {
  section: ResumeSections;
  setSection: (section: ResumeSections) => void;
  openCustomize: boolean;
  setOpenCustomize: (open: boolean) => void;
};

type PanelHandle = {
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
};

type Panel = {
  size: number;
  setSize: (size: number) => void;
  handle: PanelHandle;
};

interface BuilderState {
  builder: {
    type: BuilderType;
    setType: (type: BuilderType) => void;
  };
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
  activeSection: {
    left: ActiveSection;
  };
}

interface BuilderActions {
  toggle: (side: "left" | "right") => void;
}

export const useBuilderStore = create<BuilderState & BuilderActions>()(
  immer((set) => ({
    builder: {
      type: Builder.ADVANCE,
      setType: (type) => {
        set((state) => {
          state.builder.type = type;
        });
      },
    },
    activeSection: {
      left: {
        section: ResumeSections.BASICS,
        setSection: (section) => {
          set((state) => {
            state.activeSection.left.section = section;
          });
        },
        openCustomize: false,
        setOpenCustomize: (open) => {
          set((state) => {
            state.activeSection.left.openCustomize = open;
          });
        },
      },
    },
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
        size: 0,
        setSize: (size) => {
          set((state) => {
            state.panel.left.size = size;
          });
        },
        handle: {
          isDragging: false,
          setDragging: (dragging) => {
            set((state) => {
              state.panel.left.handle.isDragging = dragging;
            });
          },
        },
      },
      right: {
        size: 0,
        setSize: (size) => {
          set((state) => {
            state.panel.right.size = size;
          });
        },
        handle: {
          isDragging: false,
          setDragging: (dragging) => {
            set((state) => {
              state.panel.right.handle.isDragging = dragging;
            });
          },
        },
      },
    },
    toggle: (side) => {
      set((state) => {
        state.sheet[side].open = !state.sheet[side].open;
      });
    },
  })),
);
