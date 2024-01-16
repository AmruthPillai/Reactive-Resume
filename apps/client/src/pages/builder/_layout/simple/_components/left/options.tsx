import { t } from "@lingui/macro";
import { ScrollArea } from "@reactive-resume/ui";
import { ResumeOptions } from "@reactive-resume/utils";
import { useNavigate, useParams } from "react-router-dom";

import { SectionIcon } from "@/client/pages/builder/_components/shared/section-icon";
import { SectionMapping } from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";

export const Options = () => {
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const currentStep = activeSection.section;

  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const handleOptionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  return (
    <>
      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-16" hideScrollbar>
        <div className="grid gap-y-6 p-6 @container/right">{SectionMapping[currentStep]}</div>
      </ScrollArea>

      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id={ResumeOptions.TEMPLATE}
            name={t`Template`}
            onClick={() => handleOptionClick(ResumeOptions.TEMPLATE)}
          />
          <SectionIcon
            id={ResumeOptions.LAYOUT}
            name={t`Layout`}
            onClick={() => handleOptionClick(ResumeOptions.LAYOUT)}
          />
          <SectionIcon
            id={ResumeOptions.TYPOGRAPHY}
            name={t`Typography`}
            onClick={() => handleOptionClick(ResumeOptions.TYPOGRAPHY)}
          />
          <SectionIcon
            id={ResumeOptions.THEME}
            name={t`Theme`}
            onClick={() => handleOptionClick(ResumeOptions.THEME)}
          />
          <SectionIcon
            id={ResumeOptions.PAGE}
            name={t`Page`}
            onClick={() => handleOptionClick(ResumeOptions.PAGE)}
          />
          <SectionIcon
            id={ResumeOptions.SHARING}
            name={t`Sharing`}
            onClick={() => handleOptionClick(ResumeOptions.SHARING)}
          />
          <SectionIcon
            id={ResumeOptions.STATISTICS}
            name={t`Statistics`}
            onClick={() => handleOptionClick(ResumeOptions.STATISTICS)}
          />
          <SectionIcon
            id={ResumeOptions.EXPORT}
            name={t`Export`}
            onClick={() => handleOptionClick(ResumeOptions.EXPORT)}
          />
          <SectionIcon
            id={ResumeOptions.NOTES}
            name={t`Notes`}
            onClick={() => handleOptionClick(ResumeOptions.NOTES)}
          />
          <SectionIcon
            id={ResumeOptions.INFORMATION}
            name={t`Information`}
            onClick={() => handleOptionClick(ResumeOptions.INFORMATION)}
          />
        </div>

        <div />
      </div>
    </>
  );
};
