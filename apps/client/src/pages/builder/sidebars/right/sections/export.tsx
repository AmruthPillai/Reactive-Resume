import { t } from "@lingui/macro";
import { CircleNotchIcon, FileJsIcon, FilePdfIcon } from "@phosphor-icons/react";
import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { saveAs } from "file-saver";

import { usePrintResume } from "@/client/services/resume/print";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

const onJsonExport = () => {
  const { resume } = useResumeStore.getState();
  const filename = `reactive_resume-${resume.id}.json`;
  const resumeJSON = JSON.stringify(resume.data, null, 2);

  saveAs(new Blob([resumeJSON], { type: "application/json" }), filename);
};

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const ExportSection = () => {
  const { printResume, loading } = usePrintResume();

  const onPdfExport = async () => {
    const { resume } = useResumeStore.getState();
    const { url } = await printResume({ id: resume.id });

    openInNewTab(url);
  };

  return (
    <section id="export" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="export" size={18} name={t`Export`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Export`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
          )}
          onClick={onJsonExport}
        >
          <FileJsIcon size={22} />
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`JSON`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a JSON snapshot of your resume. This file can be used to import your resume in the future, or can even be shared with others to collaborate.`}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Temporarily disabled - styling not preserved in Google Docs export */}
        {/* <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
            gdocLoading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={async () => {
            const { resume } = useResumeStore.getState();
            try {
              setGdocLoading(true);
              const { url } = await exportResumeGDoc(resume.id);
              const win = window.open(url, "_blank");
              if (win) win.focus();
            } catch (err) {
              const message = (err as Error)?.message;
              if (message === "GoogleDriveNotConnected") {
                const width = 500;
                const height = 700;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;
                const popup = window.open(
                  "/api/integrations/google-drive/connect",
                  "gdrive-connect",
                  `width=${width},height=${height},left=${left},top=${top}`,
                );

                const poll = setInterval(async () => {
                  if (!popup || popup.closed) {
                    clearInterval(poll);
                    try {
                      const { url } = await exportResumeGDoc(resume.id);
                      const win = window.open(url, "_blank");
                      if (win) win.focus();
                    } catch {}
                  }
                }, 500);
              }
            } finally {
              setGdocLoading(false);
            }
          }}
        >
          {gdocLoading ? (
            <CircleNotchIcon size={22} className="animate-spin" />
          ) : (
            <FilePdfIcon size={22} />
          )}
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`Google Docs`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Create an editable Google Doc in your Drive.`}
            </CardDescription>
          </CardContent>
        </Card> */}

        {/* Temporarily disabled - styling not preserved in Word export */}
        {/* <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
            docxLoading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={async () => {
            const { resume } = useResumeStore.getState();
            try {
              setDocxLoading(true);
              await exportResumeDocx(resume.id, resume.title);
            } finally {
              setDocxLoading(false);
            }
          }}
        >
          {docxLoading ? (
            <CircleNotchIcon size={22} className="animate-spin" />
          ) : (
            // Reusing FilePdfIcon as a generic document icon to avoid unknown imports
            <FilePdfIcon size={22} />
          )}
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`Word (.docx)`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a Word version for easy editing and ATS uploads.`}
            </CardDescription>
          </CardContent>
        </Card> */}

        <Card
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
            loading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={onPdfExport}
        >
          {loading ? (
            <CircleNotchIcon size={22} className="animate-spin" />
          ) : (
            <FilePdfIcon size={22} />
          )}

          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`PDF`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.`}
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};
