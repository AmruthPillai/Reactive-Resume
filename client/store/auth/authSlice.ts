import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'schema';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { setUser, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
