// External libraries
import { Trans, t } from "@lingui/macro";
import { Link, useRouteError } from "react-router";
import { Button } from "@reactive-resume/ui";
import { LocaleProvider } from "@/client/providers/locale";

type RouterError = {
    status: number;
    statusText?: string;
    data: string;
    message?: string;
} & Error;

const getErrorMessage = (status: number) => {
    switch (status) {
        case 404:
            return "The page you're looking for doesn't exist.";
        case 403:
            return "You don't have permission to access this page.";
        case 500:
            return "An internal server error occurred.";
        case 401:
            return "You are not authorized to access this page.";
        case 400:
            return "The request was invalid.";
        default:
            return "An unexpected error occurred.";
    }
};

export const ErrorPage = () => {
    const error = useRouteError() as RouterError;

    return (
        <LocaleProvider>
            <main className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-sm space-y-6">
                    <h4 className="flex flex-col text-4xl font-bold text-white">
                        <span>
                            {t`Error ${error.status}`}
                        </span>
                        {error.statusText && <span className="text-base font-normal">{`${error.statusText}`}</span>}
                    </h4>

                    <p className="text-sm text-gray-500 break-words">
                        {/* {error.data || error.message} */}
                        <Trans>{error.data || error.message || getErrorMessage(error.status)}</Trans>
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-block"
                        >
                            <Button>
                                {t`Go to home`}
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </LocaleProvider>
    );
};
