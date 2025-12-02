import { t } from "@lingui/macro";
import { FileJsIcon, MagicWandIcon } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@reactive-resume/ui";
import { useRef } from "react";
import { useNavigate } from "react-router";

import { useToast } from "@/client/hooks/use-toast";
import { createGuestResume } from "@/client/pages/guest/page";
import { useResumeStore } from "@/client/stores/resume";

export const GuestLandingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onStartFromScratch = () => {
    const guestResume = createGuestResume();

    useResumeStore.setState({ resume: guestResume, isGuest: true });
    useResumeStore.temporal.getState().clear();

    void navigate("/guest/builder");
  };

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  const onImportChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const content = await file.text();
      const data = JSON.parse(content);

      const guestResume = {
        ...createGuestResume(),
        data,
      };

      useResumeStore.setState({ resume: guestResume, isGuest: true });
      useResumeStore.temporal.getState().clear();

      void navigate("/guest/builder");
    } catch {
      toast({
        variant: "error",
        title: t`Unable to import JSON resume`,
        description: t`Please make sure you are using a JSON file exported from Reactive Resume.`,
      });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t`Continue as guest`}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t`As a guest, your resume is stored only in this browser session. It will be lost if you clear your session or switch devices.`}
        </p>
      </div>

      <section className="mt-10 grid w-full max-w-xl gap-6">
        <Card className="cursor-pointer transition hover:border-primary" onClick={onStartFromScratch}>
          <CardHeader className="flex flex-row items-center gap-x-4">
            <MagicWandIcon size={24} />
            <div className="space-y-1 text-left">
              <CardTitle className="text-base">{t`Start from scratch`}</CardTitle>
              <CardDescription>
                {t`Create a new resume and start editing immediately in the builder.`}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition hover:border-primary" onClick={onImportClick}>
          <CardHeader className="flex flex-row items-center gap-x-4">
            <FileJsIcon size={24} />
            <div className="space-y-1 text-left">
              <CardTitle className="text-base">{t`Import JSON resume`}</CardTitle>
              <CardDescription>
                {t`Import a JSON file previously exported from Reactive Resume and continue editing as a guest.`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="hidden">
            <Button size="sm" variant="outline">
              {t`Import`}
            </Button>
          </CardContent>
        </Card>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={onImportChange}
        />
      </section>
    </main>
  );
};


