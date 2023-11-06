import { pageSizeMap } from "@reactive-resume/utils";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Frame from "react-frame-component";
import webfontloader from "webfontloader";

import { useStore } from "./store";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const FrameWrapper = ({ children, style }: Props) => {
  const resume = useStore();
  const format = resume.metadata.page.format;
  const font = resume.metadata.typography.font;

  const fontString = useMemo(() => {
    const family = font.family;
    const variants = font.variants.join(",");
    const subset = font.subset;

    return `${family}:${variants}:${subset}`;
  }, [font]);

  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const width = useMemo(() => `${pageSizeMap[format].width}mm`, [format]);
  const [height, setHeight] = useState(`${pageSizeMap[format].height}mm`);

  const handleResize = useCallback((frame: HTMLIFrameElement) => {
    const height = frame.contentDocument?.body?.scrollHeight ?? 0;
    setHeight(`${height}px`);
  }, []);

  const loadFonts = useCallback(
    (frame: HTMLIFrameElement) => {
      if (font.family === "CMU Serif") {
        return webfontloader.load({
          classes: false,
          custom: {
            families: ["CMU Serif"],
            urls: ["https://cdn.jsdelivr.net/npm/computer-modern/cmu-serif.min.css"],
          },
          context: frame.contentWindow!,
          fontactive: () => handleResize(frame!),
        });
      }

      webfontloader.load({
        classes: false,
        google: { families: [fontString] },
        context: frame.contentWindow!,
        fontactive: () => handleResize(frame!),
      });
    },
    [font, fontString, handleResize],
  );

  const loadIconFonts = useCallback((frame: HTMLIFrameElement) => {
    const document = frame.contentDocument!;

    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css";

    document.head.appendChild(link);
  }, []);

  const onLoad = useCallback(() => {
    if (!frameRef.current) return;

    handleResize(frameRef.current);
    loadFonts(frameRef.current);
    loadIconFonts(frameRef.current);
  }, [frameRef, handleResize, loadFonts, loadIconFonts]);

  useEffect(() => {
    onLoad();
  }, [resume, onLoad]);

  useEffect(() => {
    setTimeout(onLoad, 250);
  }, [onLoad]);

  return (
    <Frame
      ref={frameRef}
      onLoad={onLoad}
      onLoadedData={onLoad}
      style={{ width, height, pointerEvents: "none", ...style }}
    >
      {children}
    </Frame>
  );
};
