import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import webfontloader from "webfontloader";

import { useArtboardStore } from "../store/artboard";

export const ArtboardPage = () => {
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

    document.documentElement.style.setProperty("--color-text", `${metadata.theme.text}`);
    document.documentElement.style.setProperty("--color-primary", `${metadata.theme.primary}`);
    document.documentElement.style.setProperty(
      "--color-background",
      `${metadata.theme.background}`,
    );
  }, [metadata]);

  // Typography Options
  useEffect(() => {
    if (metadata.typography.hideIcons) {
      document.querySelector("#root")!.classList.add("hide-icons");
    } else {
      document.querySelector("#root")!.classList.remove("hide-icons");
    }

    if (metadata.typography.underlineLinks) {
      document.querySelector("#root")!.classList.add("underline-links");
    } else {
      document.querySelector("#root")!.classList.remove("underline-links");
    }
  }, [metadata]);

  return <Outlet />;
};
