import { t } from "@lingui/macro";
import { ScrollArea } from "@reactive-resume/ui";
import { ResumeOptions } from "@reactive-resume/utils";

import { SectionIcon } from "@/client/pages/builder/_components/shared/section-icon";
import { SectionMapping } from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";

export const Options = () => {
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const currentStep = activeSection.section;

  return (
    <>
      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-16">
        <div className="grid gap-y-6 p-6 @container/right">{SectionMapping[currentStep]}</div>
      </ScrollArea>

      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id={ResumeOptions.TEMPLATE}
            name={t`Template`}
            onClick={() => activeSection.setSection(ResumeOptions.TEMPLATE)}
          />
          <SectionIcon
            id={ResumeOptions.LAYOUT}
            name={t`Layout`}
            onClick={() => activeSection.setSection(ResumeOptions.LAYOUT)}
          />
          <SectionIcon
            id={ResumeOptions.TYPOGRAPHY}
            name={t`Typography`}
            onClick={() => activeSection.setSection(ResumeOptions.TYPOGRAPHY)}
          />
          <SectionIcon
            id={ResumeOptions.THEME}
            name={t`Theme`}
            onClick={() => activeSection.setSection(ResumeOptions.THEME)}
          />
          <SectionIcon
            id={ResumeOptions.PAGE}
            name={t`Page`}
            onClick={() => activeSection.setSection(ResumeOptions.PAGE)}
          />
          <SectionIcon
            id={ResumeOptions.SHARING}
            name={t`Sharing`}
            onClick={() => activeSection.setSection(ResumeOptions.SHARING)}
          />
          <SectionIcon
            id={ResumeOptions.STATISTICS}
            name={t`Statistics`}
            onClick={() => activeSection.setSection(ResumeOptions.STATISTICS)}
          />
          <SectionIcon
            id={ResumeOptions.EXPORT}
            name={t`Export`}
            onClick={() => activeSection.setSection(ResumeOptions.EXPORT)}
          />
          <SectionIcon
            id={ResumeOptions.NOTES}
            name={t`Notes`}
            onClick={() => activeSection.setSection(ResumeOptions.NOTES)}
          />
          <SectionIcon
            id={ResumeOptions.INFORMATION}
            name={t`Information`}
            onClick={() => activeSection.setSection(ResumeOptions.INFORMATION)}
          />
        </div>

        <div />
      </div>
    </>
  );
};
