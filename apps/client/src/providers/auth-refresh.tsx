import { useEffect, useRef } from "react";

import { axios } from "../libs/axios";
import { refreshToken } from "../services/auth/refresh";
import { useAuthStore } from "../stores/auth";

type Props = {
  children: React.ReactNode;
};

/**
 * The AuthRefreshProvider wrapper is responsible for refreshing
 * the access token every 5 minutes while the user is authenticated.
 *
 * @param children The children to render.
 */
export const AuthRefreshProvider = ({ children }: Props) => {
  const intervalId = useRef<NodeJS.Timeout>();
  const isLoggedIn = useAuthStore((state) => !!state.user);

  useEffect(() => {
    if (!isLoggedIn && intervalId.current) {
      clearInterval(intervalId.current);
      return;
    }

    const _refreshToken = () => refreshToken(axios);
    intervalId.current = setInterval(_refreshToken, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isLoggedIn]);

  return children;
};
