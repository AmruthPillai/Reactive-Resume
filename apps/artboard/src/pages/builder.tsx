import { SectionKey } from "@reactive-resume/schema";
import { pageSizeMap, Template } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { MM_TO_PX, Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const BuilderLayout = () => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  // Read the full resume object (may be null while loading)
  const resumeData = useArtboardStore((state) => state.resume);

  // Resolve template key safely so hooks run in the same order every render.
  const templateKey = (resumeData?.metadata.template as Template) ?? null;
  const Template = useMemo(() => {
    if (!templateKey) return () => null;
    return getTemplate(templateKey);
  }, [templateKey]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "ZOOM_IN") transformRef.current?.zoomIn(0.2);
      if (event.data.type === "ZOOM_OUT") transformRef.current?.zoomOut(0.2);
      if (event.data.type === "CENTER_VIEW") transformRef.current?.centerView();
      if (event.data.type === "RESET_VIEW") {
        transformRef.current?.resetTransform(0);
        setTimeout(() => transformRef.current?.centerView(0.8, 0), 10);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transformRef]);

  // If resume data isn't available yet, render nothing (hooks already executed)
  if (!resumeData) return null;

  const format = resumeData.metadata.page.format;
  const layout = resumeData.metadata.layout;

  return (
    <TransformWrapper
      ref={transformRef}
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={0.8}
      limitToBounds={false}
    >
      <TransformComponent
        wrapperClass="!w-screen !h-screen"
        contentClass="grid items-start justify-center space-x-12 pointer-events-none"
        contentStyle={{
          width: `${layout.length * (pageSizeMap[format].width * MM_TO_PX + 42)}px`,
          gridTemplateColumns: `repeat(${layout.length}, 1fr)`,
        }}
      >
        <AnimatePresence>
          {layout.map((columns, pageIndex) => (
            <motion.div
              key={pageIndex}
              layout
              initial={{ opacity: 0, x: -200, y: 0 }}
              animate={{ opacity: 1, x: 0, transition: { delay: pageIndex * 0.3 } }}
              exit={{ opacity: 0, x: -200 }}
            >
              <Page mode="builder" pageNumber={pageIndex + 1}>
                <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
              </Page>
            </motion.div>
          ))}
        </AnimatePresence>
      </TransformComponent>
    </TransformWrapper>
  );
};
