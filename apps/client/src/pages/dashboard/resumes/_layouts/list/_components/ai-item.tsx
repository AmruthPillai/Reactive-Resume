import { t } from "@lingui/macro";
import { MagicWand } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const AiResumeListItem = ({ resumes }: { resumes: ResumeDto[] | undefined }) => {
  const { open } = useDialog<ResumeDto[]>("resume");

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
        open("create-ai", { id: "resume", item: resumes });
      }}
    />
  );
};
