/* eslint-disable react-hooks/rules-of-hooks */
import { t } from "@lingui/macro";
import { CopySimple } from "@phosphor-icons/react";
import { Button, Input, Label, Switch, Tooltip } from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import { useToast } from "@/client/hooks/use-toast";
import { useUser } from "@/client/services/user";
import { usePortfolioStore } from "@/client/stores/portfolio";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const SharingSection = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const username = user?.username;

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  // Use appropriate store based on mode
  const setValue =
    mode === "portfolio"
      ? usePortfolioStore((state) => state.setValue)
      : useResumeStore((state) => state.setValue);

  const { slug, isPublic } =
    mode === "portfolio"
      ? {
          slug: usePortfolioStore((state) => state.portfolio.slug),
          isPublic: usePortfolioStore((state) => state.portfolio.visibility === "public"),
        }
      : {
          slug: useResumeStore((state) => state.resume.slug),
          isPublic: useResumeStore((state) => state.resume.visibility === "public"),
        };

  // If data isn't loaded yet, return null
  if (!slug) {
    return null;
  }

  // Constants
  const url = `${window.location.origin}/${username}/${slug}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description:
        mode === "portfolio"
          ? t`Anyone with this link can view your portfolio. Share it on your profile or with recruiters.`
          : t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  return (
    <section id="sharing" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("sharing")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Sharing`}</h2>
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
                  {mode === "portfolio"
                    ? t`Anyone with the link can view your portfolio.`
                    : t`Anyone with the link can view and download the resume.`}
                </p>
              </Label>
            </div>
          </div>
        </div>

        <AnimatePresence presenceAffectsLayout>
          {isPublic && (
            <motion.div
              layout
              className="space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Label htmlFor="share-url">{t`URL`}</Label>

              <div className="flex gap-x-1.5">
                <Input readOnly id="share-url" value={url} className="flex-1" />

                <Tooltip content={t`Copy to Clipboard`}>
                  <Button size="icon" variant="ghost" onClick={onCopy}>
                    <CopySimple />
                  </Button>
                </Tooltip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
};
