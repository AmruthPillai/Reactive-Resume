import { t } from "@lingui/macro";
import { MagicWand } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const AiResumeListItem = () => {
  const { open } = useDialog("resume");

  return (
    <BaseListItem
      start={<MagicWand size={18} />}
      title={
        <>
          <span>{t`Create a resume with AI`}</span>
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^K</KeyboardShortcut>
        </>
      }
      description={t`Let the AI do the work`}
      onClick={() => {
        open("create-ai");
      }}
    />
  );
};
