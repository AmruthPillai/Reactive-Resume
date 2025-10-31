import { t } from "@lingui/macro";
import { Button } from "@reactive-resume/ui";
import { Link, useRouteError } from "react-router";
import { House, ArrowLeft } from "@phosphor-icons/react";

import { LocaleProvider } from "@/client/providers/locale";
import { Logo } from "@/client/components/logo";

type RouterError = {
  statusText?: string;
  message?: string;
  status: number;
  data: string;
} & Error;

const getErrorMessage = (status: number) => {
  switch (status) {
    case 404: {
      return t`The page you're looking for doesn't exist or has been moved.`;
    }
    case 403: {
      return t`You don't have permission to access this page.`;
    }
    case 500: {
      return t`An internal server error occurred. Please try again later.`;
    }
    case 401: {
      return t`You are not authorized to access this page. Please sign in.`;
    }
    case 400: {
      return t`The request was invalid. Please check and try again.`;
    }
    default: {
      return t`An unexpected error occurred. Please try again.`;
    }
  }
};

export const ErrorPage = () => {
  const error = useRouteError() as RouterError;
  const statusCode = error.status;

  return (
    <LocaleProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        {/* Logo at top */}
        <div className="mb-12">
          <Logo size={64} />
        </div>

        {/* Error Content */}
        <div className="w-full max-w-md space-y-6 text-center">
          {/* Large Status Code */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-info">{statusCode}</h1>
            {error.statusText && (
              <h2 className="text-2xl font-semibold text-foreground">{error.statusText}</h2>
            )}
          </div>

          {/* Error Message */}
          <p className="text-base text-muted-foreground leading-relaxed">
            {error.data || error.message || getErrorMessage(statusCode)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild variant="outline" size="lg">
              <Link to="/" className="inline-flex items-center gap-2">
                <ArrowLeft size={18} />
                {t`Go Back`}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-info hover:bg-info-accent text-info-foreground">
              <Link to="/" className="inline-flex items-center gap-2">
                <House size={18} />
                {t`Go to Home`}
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t`Need help?`}{" "}
            <Link to="/#contact" className="text-info hover:underline">
              {t`Contact support`}
            </Link>
          </p>
        </div>
      </main>
    </LocaleProvider>
  );
};
