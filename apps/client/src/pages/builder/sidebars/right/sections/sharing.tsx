import { t } from "@lingui/macro";
import { CopySimpleIcon } from "@phosphor-icons/react";
import { Button, Input, Label, Switch, Tooltip } from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";

import { useToast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios"
import { useUser } from "@/client/services/user";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const SharingSection = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const username = user?.username;

  const setValue = useResumeStore((state) => state.setValue);
  const slug = useResumeStore((state) => state.resume.slug);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");

  // Constants
  const url = `${window.location.origin}/${username}/${slug}`;
  const rawJsonUrl = `${window.location.origin}${axios.defaults.baseURL}/resume/public/${username}/${slug}/stealthily`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const onRawJsonCopy = async () => {
    await navigator.clipboard.writeText(rawJsonUrl);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the json data of the resume. This link will not count towards the resume view count.`,
    });
  };

  return (
    <section id="sharing" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="sharing" size={18} name={t`Sharing`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Sharing`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-x-4">
            <Switch
              id="visibility"
              checked={isPublic}
              onCheckedChange={(checked) => {
                setValue("visibility", checked ? "public" : "private");
              }}
            />
            <div>
              <Label htmlFor="visibility" className="space-y-1">
                <p>{t`Public`}</p>
                <p className="text-xs opacity-60">
                  {t`Anyone with the link can view and download the resume.`}
                </p>
              </Label>
            </div>
          </div>
        </div>

        <AnimatePresence presenceAffectsLayout>
          {isPublic && (
            <motion.div
              layout
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="resume-url">{t`URL`}</Label>

                <div className="flex gap-x-1.5">
                  <Input
                    readOnly
                    id="resume-url"
                    value={url}
                    className="flex-1 caret-transparent"
                  />

                  <Tooltip content={t`Copy to Clipboard`}>
                    <Button size="icon" variant="ghost" onClick={onCopy}>
                      <CopySimpleIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resume-raw-json-url" className="space-y-1">
                  <p>{t`Raw JSON URL`}</p>
                  <p className="text-xs opacity-60">{t`For advanced users! Does not count towards resume statistics.`}</p>
                </Label>

                <div className="flex gap-x-1.5">
                  <Input
                    readOnly
                    id="resume-raw-json-url"
                    value={rawJsonUrl}
                    className="flex-1 caret-transparent"
                  />

                  <Tooltip content={t`Copy to Clipboard`}>
                    <Button size="icon" variant="ghost" onClick={onRawJsonCopy}>
                      <CopySimpleIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
};
