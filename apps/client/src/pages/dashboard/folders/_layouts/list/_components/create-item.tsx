import { t } from "@lingui/macro";
import { FolderPlus } from "@phosphor-icons/react";
import type { FolderDto } from "@reactive-resume/dto";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const CreateFolderListItem = () => {
  const { open } = useDialog<FolderDto>("folder");

  return (
    <BaseListItem
      start={<FolderPlus size={18} />}
      title={
        <>
          <span> {t`Create a new folder`}</span>
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^NF</KeyboardShortcut>
        </>
      }
      description={t`Group your resumes as you want!`}
      onClick={() => {
        open("create");
      }}
    />
  );
};
