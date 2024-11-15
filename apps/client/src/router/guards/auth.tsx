import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "@/client/services/user";
import { useDialog } from "@/client/stores/dialog";

export const AuthGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open: openOnboardingAi } = useDialog("onboarding-ai");

  const redirectTo = location.pathname + location.search;

  const { user, loading } = useUser();

  useEffect(() => {
    const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
    const onboardingLinkedinId = localStorage.getItem("onboardingLinkedinId");

    if (redirectAfterLogin && !loading) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectAfterLogin);
    }

    if (user && !loading && onboardingLinkedinId) {
      openOnboardingAi("create");
    }

  }, [loading]);

  if (loading) return null;

  if (user) {
    return <Outlet />;
  }

  return <Navigate replace to={`/auth/login?redirect=${redirectTo}`} />;
};
