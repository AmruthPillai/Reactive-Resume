import { useRouteError } from "react-router";
import { Button } from "@reactive-resume/ui";

type RouterError = {
    status: number;
    statusText?: string;
    data: string;
    message?: string;
} & Error;

export const ErrorPage = () => {
    const error = useRouteError() as RouterError;

    return (
        <main className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm space-y-6">
                <h4 className="flex flex-col text-4xl font-bold text-white">
                    <span>
                        Error {error.status}
                    </span>
                    {error.statusText && <span className="text-base font-normal">{error.statusText}</span>}
                </h4>

                <p className="text-sm text-gray-500 break-words">
                    {error.data || error.message}
                </p>

                <div className="pt-2">
                    <a
                        href={process.env.PUBLIC_URL}
                        className="inline-block"
                    >
                        <Button>
                            Go to home
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
};
