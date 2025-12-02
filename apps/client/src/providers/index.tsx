import { TooltipProvider } from "@reactive-resume/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";

import { helmetContext } from "../constants/helmet";
import { queryClient } from "../libs/query-client";
import { AuthRefreshProvider } from "./auth-refresh";
import { DialogProvider } from "./dialog";
import { LocaleProvider } from "./locale";
import { ThemeProvider } from "./theme";
import { Toaster } from "./toaster";

/**
 * Composes multiple React providers into a single component.
 * Reduces nesting complexity by composing providers from right to left.
 */
function composeProviders(...providers: React.FC<{ children: React.ReactNode }>[]) {
  return providers.reduce(
    (Prev, Curr) => ({ children }: { children: React.ReactNode }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ),
    ({ children }: { children: React.ReactNode }) => <>{children}</>
  );
}

// Create a composed provider that includes all application providers
const ComposedProviders = composeProviders(
  LocaleProvider,
  ({ children }) => <HelmetProvider context={helmetContext}>{children}</HelmetProvider>,
  ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  AuthRefreshProvider,
  ThemeProvider,
  TooltipProvider,
  DialogProvider,
);

export const Providers = () => (
  <ComposedProviders>
    <Outlet />
    <Toaster />
  </ComposedProviders>
);
