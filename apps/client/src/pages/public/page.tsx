import { t } from "@lingui/macro";
import { CircleNotch, FilePdf } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import { Button } from "@reactive-resume/ui";
import { pageSizeMap } from "@reactive-resume/utils";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, LoaderFunction, redirect, useLoaderData } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { queryClient } from "@/client/libs/query-client";
import { findResumeByUsernameSlug, usePrintResume } from "@/client/services/resume";

export const PublicResumePage = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const { printResume, loading } = usePrintResume();

  const { id, title, data: resume } = useLoaderData() as ResumeDto;
  const format = resume.metadata.page.format;

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume };
    (() => frameRef.current.contentWindow.postMessage(message, "*"))();
  }, [frameRef, resume]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateResumeInFrame);
    return () => frameRef.current?.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;

    const handleMessage = (event: MessageEvent) => {
      if (!frameRef.current || !frameRef.current.contentWindow) return;
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
    const { url } = await printResume({ id });

    const openInNewTab = (url: string) => {
      const win = window.open(url, "_blank");
      if (win) win.focus();
    };

    openInNewTab(url);
  };

  return (
    <div>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <div
        style={{ width: `${pageSizeMap[format].width}mm` }}
        className="mx-auto mb-6 mt-16 overflow-hidden rounded shadow-xl print:m-0 print:shadow-none"
      >
        <iframe
          title={title}
          ref={frameRef}
          scrolling="no"
          src="/artboard/preview"
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
            {loading ? <CircleNotch size={16} className="animate-spin" /> : <FilePdf size={16} />}
            {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
            <span>{t`Download PDF`}</span>
          </Button>

          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export const publicLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const username = params.username as string;
    const slug = params.slug as string;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { username, slug }],
      queryFn: () => findResumeByUsernameSlug({ username, slug }),
    });

    return resume;
  } catch (error) {
    return redirect("/");
  }
};
