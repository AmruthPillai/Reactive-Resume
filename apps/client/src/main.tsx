import * as Sentry from "@sentry/react";
import { StrictMode, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { router } from "./router";

if (import.meta.env.VITE_CLIENT_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_CLIENT_SENTRY_DSN,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        matchRoutes,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
      }),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.5,
    replaysOnErrorSampleRate: 0.5,
    replaysSessionSampleRate: 0.25,
  });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
