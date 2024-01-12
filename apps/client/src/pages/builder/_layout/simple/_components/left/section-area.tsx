import { t } from "@lingui/macro";
import { PlusCircle } from "@phosphor-icons/react";
import {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@reactive-resume/schema";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { Fragment, useRef } from "react";

import { BasicsSection } from "@/client/pages/builder/_components/sections/basics";
import { SectionBase } from "@/client/pages/builder/_components/sections/shared/section-base";
import { SummarySection } from "@/client/pages/builder/_components/sections/summary";
import { useResumeStore } from "@/client/stores/resume";

export const SectionArea = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);

  return (
    <ScrollArea orientation="vertical" className="h-screen flex-1 pb-0">
      <div ref={containterRef} className="grid gap-y-6 p-6 @container/left">
        <BasicsSection />
        <Separator />
        <SummarySection />
        <Separator />
        <SectionBase<Profile>
          id="profiles"
          title={(item) => item.network}
          description={(item) => item.username}
        />
        <Separator />
        <SectionBase<Experience>
          id="experience"
          title={(item) => item.company}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Education>
          id="education"
          title={(item) => item.institution}
          description={(item) => item.area}
        />
        <Separator />
        <SectionBase<Skill>
          id="skills"
          title={(item) => item.name}
          description={(item) => {
            if (item.description) return item.description;
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Language>
          id="languages"
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Award>
          id="awards"
          title={(item) => item.title}
          description={(item) => item.awarder}
        />
        <Separator />
        <SectionBase<Certification>
          id="certifications"
          title={(item) => item.name}
          description={(item) => item.issuer}
        />
        <Separator />
        <SectionBase<Interest>
          id="interests"
          title={(item) => item.name}
          description={(item) => {
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Project>
          id="projects"
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Publication>
          id="publications"
          title={(item) => item.name}
          description={(item) => item.publisher}
        />
        <Separator />
        <SectionBase<Volunteer>
          id="volunteer"
          title={(item) => item.organization}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Reference>
          id="references"
          title={(item) => item.name}
          description={(item) => item.description}
        />

        {/* Custom Sections */}
        {Object.values(customSections).map((section) => (
          <Fragment key={section.id}>
            <Separator />

            <SectionBase<CustomSection>
              id={`custom.${section.id}`}
              title={(item) => item.name}
              description={(item) => item.description}
            />
          </Fragment>
        ))}

        <Separator />

        <Button size="lg" variant="outline" onClick={addSection}>
          <PlusCircle />
          <span className="ml-2">{t`Add a new section`}</span>
        </Button>
      </div>
    </ScrollArea>
  );
};
