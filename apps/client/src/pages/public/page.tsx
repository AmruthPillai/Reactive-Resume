import { t } from "@lingui/macro";
import { CircleNotch, FilePdf } from "@phosphor-icons/react";
import { PortfolioDto, ResumeDto } from "@reactive-resume/dto";
import { Button } from "@reactive-resume/ui";
import { pageSizeMap } from "@reactive-resume/utils";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, LoaderFunction, redirect, useLoaderData, useSearchParams } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { queryClient } from "@/client/libs/query-client";
import { findPortfolioByUsernameSlug } from "@/client/services/portfolio";
import { findResumeByUsernameSlug, usePrintResume } from "@/client/services/resume";

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const PublicPage = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  const { printResume, loading } = usePrintResume();
  const data = useLoaderData() as ResumeDto | PortfolioDto;

  const { id, title } = data;
  const format =
    mode === "portfolio"
      ? "a4" // or your preferred default for portfolio
      : data.data.metadata.page.format;

  const updateDataInFrame = useCallback(() => {
    if (!frameRef.current?.contentWindow) return;
    const message = { type: "SET_DATA", payload: data };
    (() => {
      frameRef.current.contentWindow.postMessage(message, "*");
    })();
  }, [frameRef, data]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateDataInFrame);
    return () => frameRef.current?.removeEventListener("load", updateDataInFrame);
  }, [frameRef]);

  useEffect(() => {
    if (!frameRef.current?.contentWindow) return;

    const handleMessage = (event: MessageEvent) => {
      if (!frameRef.current?.contentWindow) return;
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "PAGE_LOADED") {
        frameRef.current.width = event.data.payload.width;
        frameRef.current.height = event.data.payload.height;
        frameRef.current.contentWindow.removeEventListener("message", handleMessage);
      }
    };

    frameRef.current.contentWindow.addEventListener("message", handleMessage);

    return () => {
      frameRef.current?.contentWindow?.removeEventListener("message", handleMessage);
    };
  }, [frameRef]);

  const onDownloadPdf = async () => {
    if (mode === "portfolio") {
      // Handle portfolio download if needed
      return;
    }

    const { url } = await printResume({ id });
    openInNewTab(url);
  };

  return (
    <div>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>
      {mode === "resume" ? (
        <>
          <div
            style={{ width: `${pageSizeMap[format].width}mm` }}
            className="mx-auto mb-6 mt-16 overflow-hidden rounded shadow-xl print:m-0 print:shadow-none"
          >
            <iframe
              ref={frameRef}
              title={title}
              src={`/artboard/preview?mode=${mode}`}
              style={{ width: `${pageSizeMap[format].width}mm`, overflow: "hidden" }}
            />
          </div>
          <div className="flex justify-center py-10 opacity-50 print:hidden">
            <Link to="/">
              <Button size="sm" variant="ghost" className="space-x-1.5 text-xs font-normal">
                <span>{t`Built with`}</span>
                <Icon size={12} />
                <span>{t`Reactive Resume`}</span>
              </Button>
            </Link>
          </div>
          <div className="fixed bottom-5 right-5 print:hidden">
            <div className="flex items-center gap-x-4">
              <Button variant="outline" className="gap-x-2 rounded-full" onClick={onDownloadPdf}>
                {loading ? (
                  <CircleNotch size={16} className="animate-spin" />
                ) : (
                  <FilePdf size={16} />
                )}
                <span>{t`Download PDF`}</span>
              </Button>

              <ThemeSwitch />
            </div>
          </div>
        </>
      ) : (
        // Portfolio Layout - Full Width
        <div className="w-full">
          <iframe
            ref={frameRef}
            title={title}
            src={`/artboard/preview?mode=portfolio`}
            className="min-h-screen w-full border-none"
          />
        </div>
      )}
    </div>
  );
};

export const publicLoader: LoaderFunction<ResumeDto | PortfolioDto> = async ({
  params,
  request,
}) => {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode") ?? "resume";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const username = params.username!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const slug = params.slug!;

    if (mode === "portfolio") {
      return await queryClient.fetchQuery({
        queryKey: ["portfolio", { username, slug }],
        queryFn: () => findPortfolioByUsernameSlug({ username, slug }),
      });
    }

    return await queryClient.fetchQuery({
      queryKey: ["resume", { username, slug }],
      queryFn: () => findResumeByUsernameSlug({ username, slug }),
    });
  } catch {
    return redirect("/");
  }
};
