import type { SectionKey } from "@reactive-resume/schema";
import { create } from "zustand";

export type DialogName = "resume" | "lock" | "import" | "two-factor" | SectionKey;

export type DialogMode = "create" | "update" | "duplicate" | "delete";

export type DialogPayload<T = unknown> = {
  id: DialogName;
  item?: T;
};

type Dialog<T = unknown> = {
  name: DialogName;
  mode: DialogMode;
  payload?: DialogPayload<T>;
};

type DialogState = {
  dialog: Dialog | null;
};

type DialogActions = {
  setDialog: <T>(dialog: Dialog<T> | null) => void;
};

export const useDialogStore = create<DialogState & DialogActions>()((set) => ({
  dialog: null,
  setDialog: (dialog) => {
    set({ dialog });
  },
}));

export const useDialog = <T = unknown>(name: DialogName) => {
  const dialog = useDialogStore((state) => {
    if (name.startsWith("custom.")) name = "custom";
    return state.dialog?.name === name ? state.dialog : null;
  });

  return {
    isOpen: !!dialog,
    mode: dialog?.mode,
    payload: dialog?.payload as DialogPayload<T>,
    open: (mode: DialogMode, payload?: DialogPayload<T>) => {
      useDialogStore.setState({ dialog: { name, mode, payload } });
    },
    close: () => {
      useDialogStore.setState({ dialog: null });
    },
  };
};
