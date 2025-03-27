import { TooltipProvider } from "@reactive-resume/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";

import { helmetContext } from "../constants/helmet";
import { queryClient } from "../libs/query-client";
import { DialogProvider } from "./dialog";
import { LocaleProvider } from "./locale";
import { SupabaseProvider } from "./supabase-provider";
import { ThemeProvider } from "./theme";
import { Toaster } from "./toaster";

export const Providers = () => (
  <LocaleProvider>
    <HelmetProvider context={helmetContext}>
      <SupabaseProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <DialogProvider>
                <Outlet />

                <Toaster />
              </DialogProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SupabaseProvider>
    </HelmetProvider>
  </LocaleProvider>
);
