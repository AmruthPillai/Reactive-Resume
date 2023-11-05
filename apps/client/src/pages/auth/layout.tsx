import { useMemo } from "react";
import { Link, matchRoutes, Outlet, useLocation } from "react-router-dom";

import { Logo } from "@/client/components/logo";

import { SocialAuth } from "./_components/social-auth";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();

  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[420px] sm:px-0 lg:basis-[480px] lg:px-12">
        <Link to="/" className="h-24 w-24">
          <Logo className="-ml-3" size={96} />
        </Link>

        <Outlet />

        {isAuthRoute && (
          <>
            <div className="flex items-center gap-x-4">
              <hr className="flex-1" />
              <span className="text-xs font-medium">or continue with</span>
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
            href="https://unsplash.com/photos/Oaqk7qqNh_c"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Photograph by Patrick Tomasso
          </a>
        </div>
      </div>
    </div>
  );
};
