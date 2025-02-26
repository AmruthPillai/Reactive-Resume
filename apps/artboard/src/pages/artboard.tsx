import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router";
import webfontloader from "webfontloader";

import { useArtboardStore } from "../store/artboard";

export const ArtboardPage = () => {
  const name = useArtboardStore((state) => state.resume.basics.name);
  const metadata = useArtboardStore((state) => state.resume.metadata);

  const fontString = useMemo(() => {
    const family = metadata.typography.font.family;
    const variants = metadata.typography.font.variants.join(",");
    const subset = metadata.typography.font.subset;

    return `${family}:${variants}:${subset}`;
  }, [metadata.typography.font]);

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

  // Font Size & Line Height
  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `${metadata.typography.font.size}px`);
    document.documentElement.style.setProperty("line-height", `${metadata.typography.lineHeight}`);

    document.documentElement.style.setProperty("--margin", `${metadata.page.margin}px`);
    document.documentElement.style.setProperty("--font-size", `${metadata.typography.font.size}px`);
    document.documentElement.style.setProperty(
      "--line-height",
      `${metadata.typography.lineHeight}`,
    );

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

  return (
    <>
      <Helmet>
        <title>{name} | Reactive Resume</title>
        {/* {metadata.css.visible && (
        <style id="custom-css" lang="css">
          {metadata.css.value}
        </style>
        )}  */}
        {/* OBS */}
      </Helmet>

      <Outlet />
    </>
  );
};
