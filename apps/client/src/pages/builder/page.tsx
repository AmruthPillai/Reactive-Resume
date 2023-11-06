import { ResumeDto } from "@reactive-resume/dto";
import { SectionKey } from "@reactive-resume/schema";
import {
  Artboard,
  PageBreakLine,
  PageGrid,
  PageNumber,
  PageWrapper,
  templatesList,
} from "@reactive-resume/templates";
import { pageSizeMap } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect } from "react-router-dom";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderPage = () => {
  const title = useResumeStore((state) => state.resume.title);
  const resume = useResumeStore((state) => state.resume.data);
  const setTransformRef = useBuilderStore((state) => state.transform.setRef);

  const { pageHeight, showBreakLine, showPageNumbers } = useMemo(() => {
    const { format, options } = resume.metadata.page;

    return {
      pageHeight: pageSizeMap[format].height,
      showBreakLine: options.breakLine,
      showPageNumbers: options.pageNumbers,
    };
  }, [resume.metadata.page]);

  const Template = useMemo(() => {
    const Component = templatesList.find((template) => template.id === resume.metadata.template)
      ?.Component;

    if (!Component) return null;

    return Component;
  }, [resume.metadata.template]);

  return (
    <>
      <Helmet>
        <title>{title} - Reactive Resume</title>
      </Helmet>

      <TransformWrapper
        centerOnInit
        minScale={0.4}
        initialScale={1}
        limitToBounds={false}
        velocityAnimation={{ disabled: true }}
        ref={(ref: ReactZoomPanPinchRef) => setTransformRef(ref)}
      >
        <TransformComponent wrapperClass="!w-screen !h-screen">
          <PageGrid $offset={32}>
            <AnimatePresence presenceAffectsLayout>
              {resume.metadata.layout.map((columns, pageIndex) => (
                <motion.div
                  layout
                  key={pageIndex}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Artboard resume={resume}>
                    <PageWrapper>
                      {showPageNumbers && <PageNumber>Page {pageIndex + 1}</PageNumber>}

                      {Template !== null && (
                        <Template
                          isFirstPage={pageIndex === 0}
                          columns={columns as SectionKey[][]}
                        />
                      )}

                      {showBreakLine && <PageBreakLine $pageHeight={pageHeight} />}
                    </PageWrapper>
                  </Artboard>
                </motion.div>
              ))}
            </AnimatePresence>
          </PageGrid>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const id = params.id as string;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { id }],
      queryFn: () => findResumeById({ id }),
    });

    useResumeStore.setState({ resume });
    useResumeStore.temporal.getState().clear();

    return resume;
  } catch (error) {
    return redirect("/dashboard");
  }
};
