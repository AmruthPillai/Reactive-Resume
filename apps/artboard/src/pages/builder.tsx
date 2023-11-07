import { SectionKey } from "@reactive-resume/schema";
import { pageSizeMap } from "@reactive-resume/utils";
import { useEffect, useRef } from "react";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { MM_TO_PX, Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { Rhyhorn } from "../templates/rhyhorn";

export const BuilderLayout = () => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const format = useArtboardStore((state) => state.resume.metadata.page.format);
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template);

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

  return (
    <TransformWrapper
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={0.8}
      ref={transformRef}
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
        {layout.map((columns, pageIndex) => (
          <Page key={pageIndex} mode="builder" pageNumber={pageIndex + 1}>
            {template === "rhyhorn" && (
              <Rhyhorn isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
            )}
          </Page>
        ))}
      </TransformComponent>
    </TransformWrapper>
  );
};
