import { t } from "@lingui/macro";
import { MagicWand } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

export const AiResumeCard = () => {
  const { open } = useDialog("ai");

  return (
    <BaseCard
      withShineBorder
      onClick={() => {
        open("create");
      }}
    >
      <MagicWand size={64} weight="thin" />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
          "bg-gradient-to-t from-background/80 to-transparent",
        )}
      >
        <h4 className="line-clamp-1 font-medium">
          {t`Create a resume with AI`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^K</KeyboardShortcut>
        </h4>

        <p className="line-clamp-1 text-xs opacity-75">{t`Let the AI do the work`}</p>
      </div>
    </BaseCard>
  );
};
