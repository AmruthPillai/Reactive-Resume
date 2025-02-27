import { t } from "@lingui/macro";
import { CircleNotch, FilePdf } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { pageSizeMap } from "@reactive-resume/utils";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router";

import { Icon } from "@/client/components/icon";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { usePrintResume } from "@/client/services/resume";

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const PublicProfilePage = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const { printResume, loading } = usePrintResume();

  const { id, title, data: resume } = useLoaderData();
  const format = resume.metadata.page.format as keyof typeof pageSizeMap;

  const updateResumeInFrame = useCallback(() => {
    const message = { type: "SET_RESUME", payload: resume };

    setImmediate(() => {
      frameRef.current?.contentWindow?.postMessage(message, "*");
    });
  }, [frameRef.current, resume]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateResumeInFrame);
    return () => frameRef.current?.removeEventListener("load", updateResumeInFrame);
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

      <div
        style={{ width: `${pageSizeMap[format].width}mm` }}
        className="relative z-50 overflow-hidden rounded shadow-xl sm:mx-auto sm:mb-6 sm:mt-16 print:m-0 print:shadow-none"
      >
        <iframe
          ref={frameRef}
          title={title}
          src="/artboard/preview"
          style={{ width: `${pageSizeMap[format].width}mm`, overflow: "hidden" }}
        />
      </div>

      <div className="hidden justify-center py-10 opacity-50 sm:flex print:hidden">
        <Link to="/">
          <Button size="sm" variant="ghost" className="space-x-1.5 text-xs font-normal">
            <span>{t`Built with`}</span>
            <Icon size={12} />
            <span>{t`Reactive Resume`}</span>
          </Button>
        </Link>
      </div>

      <div className="fixed bottom-5 right-5 z-0 hidden sm:block print:hidden">
        <div className="flex flex-col items-center gap-y-2">
          <Button size="icon" variant="ghost" onClick={onDownloadPdf}>
            {loading ? <CircleNotch size={20} className="animate-spin" /> : <FilePdf size={20} />}
          </Button>

          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};
