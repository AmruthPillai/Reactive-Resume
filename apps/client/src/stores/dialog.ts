import { SectionKey } from "@reactive-resume/schema";
import { ResumeSections } from "@reactive-resume/utils";
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

interface DialogState {
  dialog: Dialog | null;
}

interface DialogActions {
  setDialog: <T>(dialog: Dialog<T> | null) => void;
}

export const useDialogStore = create<DialogState & DialogActions>()((set) => ({
  dialog: null,
  setDialog: (dialog) => set({ dialog }),
}));

export const useDialog = <T = unknown>(name: DialogName) => {
  const dialog = useDialogStore((state) => {
    if (name.startsWith(`${ResumeSections.CUSTOM}.`)) name = ResumeSections.CUSTOM;
    return state.dialog?.name === name ? state.dialog : null;
  });

  return {
    isOpen: !!dialog,
    mode: dialog?.mode,
    payload: dialog?.payload as DialogPayload<T>,
    open: (mode: DialogMode, payload?: DialogPayload<T>) =>
      useDialogStore.setState({ dialog: { name, mode, payload } }),
    close: () => useDialogStore.setState({ dialog: null }),
  };
};
