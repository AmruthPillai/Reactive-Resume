import { useEffect } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/client/stores/auth";

export const GuestGuard = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const redirectAfterLogin = searchParams.get("redirectAfterLogin");

  useEffect(() => {
    if (redirectAfterLogin) {
      localStorage.setItem("redirectAfterLogin", redirectAfterLogin);
    }
  }, [redirectAfterLogin]);

  if (isLoggedIn) {
    return <Navigate to={redirect} />;
  }

  return <Outlet />;
};
