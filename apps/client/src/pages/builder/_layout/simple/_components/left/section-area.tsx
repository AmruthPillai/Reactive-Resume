import { t } from "@lingui/macro";
import { SectionKey } from "@reactive-resume/schema";
import { Button, ScrollArea } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSectionIcon } from "@/client/pages/builder/_components/sections/shared/section-icon";
import { SectionMapping } from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";
import { useTemporalResumeStore } from "@/client/stores/resume";

import { Options } from "./options";

export const Steps: ResumeSections[] = [
  ResumeSections.BASICS,
  ResumeSections.SUMMARY,
  ResumeSections.PROFILES,
  ResumeSections.EXPERIENCE,
  ResumeSections.EDUCATION,
  ResumeSections.SKILLS,
  ResumeSections.LANGUAGES,
  ResumeSections.AWARDS,
  ResumeSections.CERTIFICATIONS,
  ResumeSections.INTERESTS,
  ResumeSections.PROJECTS,
  ResumeSections.PUBLICATIONS,
  ResumeSections.VOLUNTEER,
  ResumeSections.REFERENCES,
  ResumeSections.CUSTOM,
];

export const SectionArea = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const clearHistory = useTemporalResumeStore((state) => state.clear);

  const activeSection = useBuilderStore((state) => state.activeSection);
  const currentStep = activeSection.left.section;

  const handleSectionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  const onStep = (section: ResumeSections) => {
    handleSectionClick(section);
    clearHistory();
  };

  const nextSection = useMemo(() => {
    const stepIndex = Steps.findIndex((s) => s === currentStep);
    return Steps[stepIndex + 1];
  }, [Steps, currentStep]);

  const previousSection = useMemo(() => {
    const stepIndex = Steps.findIndex((s) => s === currentStep);
    return Steps[stepIndex - 1];
  }, [Steps, currentStep]);

  return activeSection.left.openOption ? (
    <Options />
  ) : (
    <ScrollArea orientation="vertical" className="flex-1 sm:h-screen">
      <div className="grid gap-y-6 p-6 @container/left">
        {SectionMapping[currentStep]}

        <div className="grid grid-cols-3 gap-y-6">
          {previousSection && (
            <Button
              className="col-span-1 gap-x-2"
              type="button"
              onClick={() => onStep(previousSection)}
            >
              {getSectionIcon(previousSection as SectionKey)}
              <span>{t`Previous`}</span>
            </Button>
          )}

          {nextSection && (
            <Button
              className="col-span-1 col-start-3 gap-x-2"
              type="button"
              onClick={() => onStep(nextSection)}
            >
              {t`Next`} {getSectionIcon(nextSection as SectionKey)}
            </Button>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};
