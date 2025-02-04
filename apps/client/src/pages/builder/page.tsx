import { t } from "@lingui/macro";
import { PortfolioDto, ResumeDto } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect } from "react-router-dom";

import { toast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { findPortfolioById } from "@/client/services/portfolio";
import { findResumeById } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { usePortfolioStore } from "@/client/stores/portfolio";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef?.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => {
      frameRef.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => {
      frameRef.removeEventListener("load", updateResumeInFrame);
    };
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);
  const titleString = title || t`Untitled`;
  return (
    <>
      <Helmet>
        <title>{`${titleString} - ${t`Reactive Resume`}`}</title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={titleString}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto | PortfolioDto> = async ({
  params,
  request,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = params.id!;
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");

  try {
    // If mode is portfolio, try to fetch portfolio first
    if (mode === "portfolio") {
      try {
        const portfolio = await queryClient.fetchQuery({
          queryKey: ["portfolio", { id }],
          queryFn: () => findPortfolioById({ id }),
        });

        usePortfolioStore.setState({ portfolio });
        usePortfolioStore.temporal.getState().clear();

        return portfolio;
      } catch (portfolioError) {
        console.error(portfolioError);

        // If portfolio not found, redirect to portfolios dashboard
        toast({
          variant: "error",
          title: t`Portfolio not found`,
          description: t`The portfolio you're looking for doesn't exist or you don't have permission to view it.`,
        });

        return redirect("/dashboard/portfolios");
      }
    }

    // If mode is resume or not specified, try to fetch resume
    try {
      const resume = await queryClient.fetchQuery({
        queryKey: ["resume", { id }],
        queryFn: () => findResumeById({ id }),
      });

      useResumeStore.setState({ resume });
      useResumeStore.temporal.getState().clear();

      return resume;
    } catch (resumeError) {
      console.error(resumeError);

      // If resume not found, redirect to resumes dashboard
      toast({
        variant: "error",
        title: t`Resume not found`,
        description: t`The resume you're looking for doesn't exist or you don't have permission to view it.`,
      });

      return redirect("/dashboard/resumes");
    }
  } catch (error) {
    console.error(error);

    // Redirect to appropriate dashboard based on mode
    return redirect(mode === "portfolio" ? "/dashboard/portfolios" : "/dashboard/resumes");
  }
};
