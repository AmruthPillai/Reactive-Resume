import { t } from "@lingui/macro";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { getValidSectionValue, ResumeSections } from "@reactive-resume/utils";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SectionMapping } from "@/client/pages/builder/_helper/section";

import { Steps } from "./steps";

export const SectionArea = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();

  const getSection = () => getValidSectionValue(params.section) || Steps[0];
  const [currentStep, setCurrentStep] = useState<ResumeSections>(() => getSection());

  useEffect(() => {
    setCurrentStep(getSection());
  }, [params]);

  const handleSectionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  const gotoFinalBuilder = () => {
    navigate(`/builder/${params.id}`);
  };

  const onStep = (step: number) => {
    const stepIndex = Steps.findIndex((s) => s === currentStep);
    handleSectionClick(Steps[stepIndex + step]);
  };

  const isNext = useMemo(() => {
    return Steps.findIndex((s) => s === currentStep) < Steps.length - 1;
  }, [Steps, currentStep]);

  const isPrevious = useMemo(() => {
    return Steps.findIndex((s) => s === currentStep) > 0;
  }, [Steps, currentStep]);

  return (
    <ScrollArea orientation="vertical" className="h-screen flex-1 pb-20">
      <div className="grid gap-y-6 p-6 @container/left">
        {SectionMapping[currentStep]}
        <Separator />

        <div className="grid grid-cols-3 gap-y-6">
          {isPrevious && (
            <Button className="col-span-1" type="button" onClick={() => onStep(-1)}>
              {t`Previous`}
            </Button>
          )}

          <Button
            className="col-span-1 col-start-3"
            type="button"
            onClick={() => (isNext ? onStep(+1) : gotoFinalBuilder())}
          >
            {isNext ? t`Next` : t`Finalize your Resume`}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
