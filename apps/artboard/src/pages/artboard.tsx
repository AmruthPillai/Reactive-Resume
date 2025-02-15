/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/rules-of-hooks */
import { defaultMetadata, defaultPortfolioMetadata } from "@reactive-resume/schema";
import { useEffect, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import webfontloader from "webfontloader";

import { useArtboardStore } from "../store/artboard";

export const ArtboardPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  // Get metadata with fallback to defaults
  const metadata = useArtboardStore((state) => {
    if (mode === "portfolio") {
      return state.portfolio?.metadata ?? defaultPortfolioMetadata;
    }
    return state.resume?.metadata ?? defaultMetadata;
  });

  // Create font string for Google Fonts
  const fontString = useMemo(() => {
    const family = metadata.typography.font.family;
    const variants = metadata.typography.font.variants.join(",");
    const subset = metadata.typography.font.subset;

    return `${family}:${variants}:${subset}`;
  }, [metadata.typography.font]);

  // Load fonts and notify parent when page is ready
  useEffect(() => {
    webfontloader.load({
      google: { families: [fontString] },
      active: () => {
        const width = window.document.body.offsetWidth;
        const height = window.document.body.offsetHeight;
        const message = { type: "PAGE_LOADED", payload: { width, height } };
        window.postMessage(message, "*");
      },
    });
  }, [fontString]);

  // Set up CSS variables and styles
  useEffect(() => {
    // Font Size & Line Height
    document.documentElement.style.setProperty("font-size", `${metadata.typography.font.size}px`);
    document.documentElement.style.setProperty("line-height", `${metadata.typography.lineHeight}`);

    // Page margins and typography
    document.documentElement.style.setProperty("--margin", `${metadata.page.margin}px`);
    document.documentElement.style.setProperty("--font-size", `${metadata.typography.font.size}px`);
    document.documentElement.style.setProperty(
      "--line-height",
      `${metadata.typography.lineHeight}`,
    );

    // Theme colors
    document.documentElement.style.setProperty("--color-foreground", metadata.theme.text);
    document.documentElement.style.setProperty("--color-primary", metadata.theme.primary);
    document.documentElement.style.setProperty("--color-background", metadata.theme.background);
  }, [metadata]);

  // Typography Options
  useEffect(() => {
    // eslint-disable-next-line unicorn/prefer-spread
    const elements = Array.from(document.querySelectorAll(`[data-page]`));

    for (const el of elements) {
      el.classList.toggle("hide-icons", metadata.typography.hideIcons);
      el.classList.toggle("underline-links", metadata.typography.underlineLinks);
    }
  }, [metadata]);

  return <Outlet />;
};
