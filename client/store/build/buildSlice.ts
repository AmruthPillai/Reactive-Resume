import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import merge from 'lodash/merge';

export type Theme = 'light' | 'dark';

export type Sidebar = 'left' | 'right';

export type SidebarState = { open: boolean };

export type Orientation = 'horizontal' | 'vertical';

export type BuildState = {
  theme?: Theme;
  sidebar: Record<Sidebar, SidebarState>;
  page: {
    breakLine: boolean;
    orientation: Orientation;
  };
};

const initialState: BuildState = {
  sidebar: {
    left: { open: false },
    right: { open: false },
  },
  page: {
    breakLine: true,
    orientation: 'horizontal',
  },
};

type SetThemePayload = { theme: Theme };

type ToggleSidebarPayload = { sidebar: Sidebar };

type SetSidebarStatePayload = { sidebar: Sidebar; state: SidebarState };

export const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    setTheme: (state: BuildState, action: PayloadAction<SetThemePayload>) => {
      const { theme } = action.payload;

      state.theme = theme;
    },
    toggleSidebar: (state, action: PayloadAction<ToggleSidebarPayload>) => {
      const { sidebar } = action.payload;

      state.sidebar[sidebar].open = !state.sidebar[sidebar].open;
    },
    setSidebarState: (state, action: PayloadAction<SetSidebarStatePayload>) => {
      const { sidebar, state: newState } = action.payload;

      state.sidebar[sidebar] = merge(state.sidebar[sidebar], newState);
    },
    togglePageBreakLine: (state) => {
      state.page.breakLine = !state.page.breakLine;
    },
    togglePageOrientation: (state) => {
      const orientation: Orientation = state.page.orientation === 'horizontal' ? 'vertical' : 'horizontal';

      state.page.orientation = orientation;
    },
  },
});

export const { setTheme, toggleSidebar, setSidebarState, togglePageBreakLine, togglePageOrientation } =
  buildSlice.actions;

export default buildSlice.reducer;
