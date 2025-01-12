import { t } from "@lingui/macro";
import { Book, SignOut } from "@phosphor-icons/react";
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
          <SignOut className="mr-3" />
          {t`Logout`}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild size="lg">
        <Link to="/auth/login">{t`Get Started`}</Link>
      </Button>

      <Button asChild size="lg" variant="link">
        <a href="https://docs.rxresu.me" target="_blank" rel="noopener noreferrer nofollow">
          <Book className="mr-3" />
          {t`Learn more`}
        </a>
      </Button>
    </>
  );
};
