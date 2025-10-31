import { t } from "@lingui/macro";
import { BookIcon, SignOutIcon } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { Link } from "react-router";

import { useLogout } from "@/client/services/auth";
import { useAuthStore } from "@/client/stores/auth";

export const HeroCTA = () => {
  const { logout } = useLogout();

  const isLoggedIn = useAuthStore((state) => !!state.user);

  if (isLoggedIn) {
    return (
      <>
        <Button asChild size="lg">
          <Link to="/dashboard">{t`Go to Dashboard`}</Link>
        </Button>

        <Button size="lg" variant="link" onClick={() => logout()}>
          <SignOutIcon className="mr-3" />
          {t`Logout`}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild size="lg" className="px-8 bg-info hover:bg-info-accent text-info-foreground">
        <Link to="/auth/register">{t`Get Started Free`}</Link>
      </Button>

      <Button asChild size="lg" variant="outline">
        <a href="#pricing">{t`View Pricing`}</a>
      </Button>
    </>
  );
};
