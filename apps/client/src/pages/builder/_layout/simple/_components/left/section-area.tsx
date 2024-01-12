import { t } from "@lingui/macro";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { useMemo, useRef, useState } from "react";

import { Steps, StepsSection } from "./steps";

export const SectionArea = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentStep, setCurrentStep] = useState<ResumeSections>(Steps[0]);

  const onPrevious = () => {
    const stepIndex = Steps.findIndex((s) => s === currentStep);
    setCurrentStep(Steps[stepIndex - 1]);
  };
  const onNext = () => {
    const stepIndex = Steps.findIndex((s) => s === currentStep);
    setCurrentStep(Steps[stepIndex + 1]);
  };

  const isNext = useMemo(() => {
    return Steps.findIndex((s) => s === currentStep) < Steps.length - 1;
  }, [Steps, currentStep]);

  const isPrevious = useMemo(() => {
    return Steps.findIndex((s) => s === currentStep) > 0;
  }, [Steps, currentStep]);

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    hide: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <ScrollArea orientation="vertical" className="h-screen flex-1 pb-20">
      <div ref={containerRef} className="grid gap-y-6 p-6 @container/left">
        {StepsSection[currentStep]}
        <Separator />

        <div className="grid grid-cols-3 gap-y-6">
          {isPrevious && (
            <Button className="col-span-1" type="button" onClick={onPrevious}>
              {t`Previous`}
            </Button>
          )}

          {isNext && (
            <Button className="col-span-1 col-start-3" type="button" onClick={onNext}>
              {t`Next`}
            </Button>
          )}
        </div>
        {/* <SectionBase<Experience>
          id={ResumeSections.EXPERIENCE}
          title={(item) => item.company}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Education>
          id={ResumeSections.EDUCATION}
          title={(item) => item.institution}
          description={(item) => item.area}
        />
        <Separator />
        <SectionBase<Skill>
          id={ResumeSections.SKILLS}
          title={(item) => item.name}
          description={(item) => {
            if (item.description) return item.description;
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Language>
          id={ResumeSections.LANGUAGES}
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Award>
          id={ResumeSections.AWARDS}
          title={(item) => item.title}
          description={(item) => item.awarder}
        />
        <Separator />
        <SectionBase<Certification>
          id={ResumeSections.CERTIFICATIONS}
          title={(item) => item.name}
          description={(item) => item.issuer}
        />
        <Separator />
        <SectionBase<Interest>
          id={ResumeSections.INTERESTS}
          title={(item) => item.name}
          description={(item) => {
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Project>
          id={ResumeSections.PROJECTS}
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Publication>
          id={ResumeSections.PUBLICATIONS}
          title={(item) => item.name}
          description={(item) => item.publisher}
        />
        <Separator />
        <SectionBase<Volunteer>
          id={ResumeSections.VOLUNTEER}
          title={(item) => item.organization}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Reference>
          id={ResumeSections.REFERENCES}
          title={(item) => item.name}
          description={(item) => item.description}
        /> */}

        {/* Custom Sections */}
        {/* {Object.values(customSections).map((section) => (
          <Fragment key={section.id}>
            <Separator />

            <SectionBase<CustomSection>
              id={`${ResumeSections.CUSTOM}.${section.id}`}
              title={(item) => item.name}
              description={(item) => item.description}
            />
          </Fragment>
        ))}

        <Separator />

        <Button size="lg" variant="outline" onClick={addSection}>
          <PlusCircle />
          <span className="ml-2">{t`Add a new section`}</span>
        </Button> */}
      </div>
    </ScrollArea>
  );
};
