import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalName =
  | 'auth.login'
  | 'auth.register'
  | 'auth.forgot'
  | 'auth.reset'
  | 'auth.profile'
  | 'dashboard.create-resume'
  | 'dashboard.import-external'
  | 'dashboard.rename-resume'
  | 'builder.sections.profile'
  | 'builder.sections.work'
  | `builder.sections.${string}`;

export type ModalState = {
  open: boolean;
  payload?: { path?: string; item?: any; onComplete?: (newItem: any) => void };
};

type PayloadType = { modal: ModalName; state: ModalState };

const initialState: Record<ModalName, ModalState> = {
  'auth.login': { open: false },
  'auth.register': { open: false },
  'auth.forgot': { open: false },
  'auth.reset': { open: false },
  'auth.profile': { open: false },
  'dashboard.create-resume': { open: false },
  'dashboard.import-external': { open: false },
  'dashboard.rename-resume': { open: false },
  'builder.sections.profile': { open: false },
  'builder.sections.work': { open: false },
  'builder.sections.education': { open: false },
  'builder.sections.awards': { open: false },
  'builder.sections.certifications': { open: false },
  'builder.sections.publications': { open: false },
  'builder.sections.skills': { open: false },
  'builder.sections.languages': { open: false },
  'builder.sections.volunteer': { open: false },
  'builder.sections.interests': { open: false },
  'builder.sections.references': { open: false },
  'builder.sections.projects': { open: false },
  'builder.sections.custom': { open: false },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (state: Record<ModalName, ModalState>, action: PayloadAction<PayloadType>) => {
      state[action.payload.modal] = action.payload.state;
    },
  },
});

export const { setModalState } = modalSlice.actions;

export default modalSlice.reducer;
