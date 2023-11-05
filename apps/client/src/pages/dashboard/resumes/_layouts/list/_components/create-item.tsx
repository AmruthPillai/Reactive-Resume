import { Plus } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const CreateResumeListItem = () => {
  const { open } = useDialog<ResumeDto>("resume");

  return (
    <BaseListItem
      start={<Plus size={18} />}
      onClick={() => open("create")}
      title={
        <>
          <span>Create a new resume</span>
          <KeyboardShortcut className="ml-2">(^N)</KeyboardShortcut>
        </>
      }
      description="Start building from scratch"
    />
  );
};
