import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { BaseCard } from "@/client/pages/dashboard/resumes/_layouts/grid/_components/base-card";
import { useDialog } from "@/client/stores/dialog";

export const CreateCompanyCard = () => {
  const { open } = useDialog("company");

  return (
    <BaseCard
      onClick={() => {
        open("create");
      }}
    >
      <Plus size={64} weight="thin" />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
          "bg-gradient-to-t from-background/80 to-transparent",
        )}
      >
        <h4 className="font-medium">
          {t`Create a new company`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^N</KeyboardShortcut>
        </h4>

        <p className="text-xs opacity-75">{t`Start building from scratch`}</p>
      </div>
    </BaseCard>
  );
};
