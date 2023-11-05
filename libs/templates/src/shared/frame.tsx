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

  const onLoad = useCallback(() => {
    if (!frameRef.current) return;

    handleResize(frameRef.current);

    if (font.family === "CMU Serif") {
      return webfontloader.load({
        classes: false,
        custom: {
          families: ["CMU Serif"],
          urls: ["https://cdn.jsdelivr.net/npm/computer-modern/cmu-serif.min.css"],
        },
        context: frameRef.current.contentWindow!,
        fontactive: () => {
          handleResize(frameRef.current!);
        },
      });
    }

    webfontloader.load({
      classes: false,
      google: { families: [fontString] },
      context: frameRef.current.contentWindow!,
      fontactive: () => {
        handleResize(frameRef.current!);
      },
    });
  }, [frameRef, font, fontString, handleResize]);

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
