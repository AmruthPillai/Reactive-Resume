import env from '@beam-australia/react-env';
import _axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { toast } from 'react-hot-toast';

import { logout } from '@/store/auth/authSlice';

import store from '../store';

export type ServerError = {
  path: string;
  message: string;
  timestamp: string;
  statusCode: number;
};

const baseURL = env('SERVER_URL') || '/api';
const axios = _axios.create({ baseURL });

axios.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;

  config.headers.set('Authorization', `Bearer ${accessToken}`);

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ServerError>) => {
    const { response } = error;

    if (response) {
      const errorObject = response.data;
      const code = errorObject.statusCode;
      const message = errorObject.message;

      toast.error(message);

      if (code === 401 || code === 404) {
        store.dispatch(logout());
        Router.push('/');
      }

      throw errorObject;
    }

    throw error;
  },
);

export default axios;
