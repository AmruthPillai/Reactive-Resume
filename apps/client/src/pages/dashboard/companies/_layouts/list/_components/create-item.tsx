import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import type { CompanyDto } from "@reactive-resume/dto";
import { KeyboardShortcut } from "@reactive-resume/ui";

import { BaseListItem } from "@/client/pages/dashboard/resumes/_layouts/list/_components/base-item";
import { useDialog } from "@/client/stores/dialog";

export const CreateCompanyListItem = () => {
  const { open } = useDialog<CompanyDto>("company");

  return (
    <BaseListItem
      start={<Plus size={18} />}
      title={
        <>
          <span>{t`Create a new company`}</span>
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^N</KeyboardShortcut>
        </>
      }
      description={t`Start building from scratch`}
      onClick={() => {
        open("create");
      }}
    />
  );
};
