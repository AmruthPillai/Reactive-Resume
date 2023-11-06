import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentResume = { slug: string; username: string };

type Dashboard = { currentResume: CurrentResume };

const initialState: Dashboard = {} as Dashboard;

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentResume: (state: Dashboard, action: PayloadAction<CurrentResume>) => {
      const { slug, username } = action.payload;
      state.currentResume = {
        slug,
        username,
      };
    },
  },
});

export const { setCurrentResume } = dashboardSlice.actions;

export default dashboardSlice.reducer;
