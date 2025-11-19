import { t } from "@lingui/macro";
import { FolderPlus } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

export const CreateFolderCard = () => {
  const { open } = useDialog("folder");

  return (
    <BaseCard
      onClick={() => {
        open("create");
      }}
    >
      <FolderPlus size={64} weight="thin" />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
          "bg-gradient-to-t from-background/80 to-transparent",
        )}
      >
        <h4 className="font-medium">
          {t`Create a new folder`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^NF</KeyboardShortcut>
        </h4>

        <p className="text-xs opacity-75"></p>
      </div>
    </BaseCard>
  );
};
