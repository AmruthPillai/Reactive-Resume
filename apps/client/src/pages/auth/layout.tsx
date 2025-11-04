import { t } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";
import { useMemo } from "react";
import { Link, matchRoutes, Outlet, useLocation } from "react-router";

import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { useAuthProviders } from "@/client/services/auth/providers";

import { SocialAuth } from "./_components/social-auth";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();
  const { providers } = useAuthProviders();
  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  if (!providers) return null;

  // Condition (providers.length === 1) hides the divider if providers[] includes only "email"
  const hideDivider = !providers.includes("email") || providers.length === 1;

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[420px] sm:px-0 lg:basis-[480px] lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="size-24">
            <Logo className="-ml-3" size={96} />
          </Link>

          <div className="right-0 space-x-2 text-right lg:absolute lg:p-12 lg:text-center">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        </div>

        <Outlet />

        {isAuthRoute && (
          <>
            <div className={cn("flex items-center gap-x-4", hideDivider && "hidden")}>
              <hr className="flex-1" />
              <span className="text-xs font-medium">
                {t({
                  message: "or continue with",
                  context:
                    "The user can either login with email/password, or continue with GitHub or Google.",
                })}
              </span>
              <hr className="flex-1" />
            </div>

            <SocialAuth />
          </>
        )}
      </div>

      <div className="relative hidden lg:block lg:flex-1">
        <img
          width={1920}
          height={1080}
          alt="Open books on a table"
          className="h-screen w-full object-cover object-center"
          src="/backgrounds/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
        />

        <div className="absolute bottom-5 right-5 z-10 bg-primary/30 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://unsplash.com/photos/Oaqk7qqNh_c"
          >
            {t`Photograph by Patrick Tomasso`}
          </a>
        </div>
      </div>
    </div>
  );
};
