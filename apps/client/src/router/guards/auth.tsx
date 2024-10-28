import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "@/client/services/user";

export const AuthGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.pathname + location.search;

  const { user, loading } = useUser();

  useEffect(() => {
    const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");

    if (redirectAfterLogin && !loading) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectAfterLogin);
    }
  }, [loading]);

  if (loading) return null;

  if (user) {
    return <Outlet />;
  }

  return <Navigate replace to={`/auth/login?redirect=${redirectTo}`} />;
};
