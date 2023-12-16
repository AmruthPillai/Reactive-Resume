import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'schema';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  errors: string;
  success: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  errors: '',
  success: '',
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
    handleError: (state, action: PayloadAction<string>) => {
      state.errors = 'An error occurred while processing your payment kindly check the phonenumber and try again';
    },
    handleSuccess: (state, action: PayloadAction<string>) => {
      state.success =
        'We have initiated an STK push for the premium version of your resume to your mobile device. Please follow the instructions on your phone to complete the payment process. Once we receive your payment, the premium product will be activated. This may take a few minutes. Thank you for choosing our premium service.';
    },
    handleChange: (state, action: PayloadAction<string>) => {
      state.errors = '';
    },
  },
});

export const { setUser, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
