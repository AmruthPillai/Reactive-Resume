import { DownloadSimple } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const ImportResumeListItem = () => {
  const { open } = useDialog("import");

  return (
    <BaseListItem
      start={<DownloadSimple size={18} />}
      onClick={() => open("create")}
      title={
        <>
          <span>Import an existing resume</span>
          <KeyboardShortcut className="ml-2">(^I)</KeyboardShortcut>
        </>
      }
      description="LinkedIn, JSON Resume, etc."
    />
  );
};
