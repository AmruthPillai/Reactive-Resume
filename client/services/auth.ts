import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { User } from 'schema';

import { logout, setAccessToken, setUser } from '@/store/auth/authSlice';

import store from '../store';
import axios from './axios';

export type LoginParams = {
  identifier: string;
  password: string;
};

export type LoginWithGoogleParams = {
  credential: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type AuthDTO = {
  user: User;
  accessToken: string;
};

export type ForgotPasswordParams = {
  email: string;
};

export type ResetPasswordParams = {
  resetToken: string;
  password: string;
};

export type UpdateProfileParams = {
  name: string;
};

export const login = async (loginParams: LoginParams) => {
  const {
    data: { user, accessToken },
  } = await axios.post<AuthDTO, AxiosResponse<AuthDTO>, LoginParams>('/auth/login', loginParams);

  store.dispatch(setUser(user));
  store.dispatch(setAccessToken(accessToken));
};

export const loginWithGoogle = async (loginWithGoogleParams: LoginWithGoogleParams) => {
  const {
    data: { user, accessToken },
  } = await axios.post<AuthDTO, AxiosResponse<AuthDTO>, LoginWithGoogleParams>('/auth/google', loginWithGoogleParams);

  store.dispatch(setUser(user));
  store.dispatch(setAccessToken(accessToken));
};

export const register = async (registerParams: RegisterParams) => {
  const {
    data: { user, accessToken },
  } = await axios.post<AuthDTO, AxiosResponse<AuthDTO>, RegisterParams>('/auth/register', registerParams);

  store.dispatch(setUser(user));
  store.dispatch(setAccessToken(accessToken));
};

export const forgotPassword = async (forgotPasswordParams: ForgotPasswordParams) => {
  await axios.post<void, AxiosResponse<void>, ForgotPasswordParams>('/auth/forgot-password', forgotPasswordParams);

  toast.success('Please check your email for the password reset link.');
};

export const resetPassword = async (resetPasswordParams: ResetPasswordParams) => {
  await axios.post<void, AxiosResponse<void>, ResetPasswordParams>('/auth/reset-password', resetPasswordParams);

  toast.success('Your password has been changed successfully, please login again.');
};

export const updateProfile = async (updateProfileParams: UpdateProfileParams) => {
  const { data: user } = await axios.patch<User, AxiosResponse<User>, UpdateProfileParams>(
    '/auth/update-profile',
    updateProfileParams,
  );

  store.dispatch(setUser(user));

  toast.success('Your profile has been successfully updated.');
};

export const deleteAccount = async () => {
  await axios.delete('/resume/all');
  await axios.delete('/auth');

  store.dispatch(logout());

  toast.success('Your account has been deleted, hope to see you again soon.');
};
