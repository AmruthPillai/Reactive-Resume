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
import { Button, Separator } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { Fragment } from "react";

import { BasicsSection } from "@/client/pages/builder/_components/sections/basics";
import { SectionBase } from "@/client/pages/builder/_components/sections/shared/section-base";
import { SummarySection } from "@/client/pages/builder/_components/sections/summary";
import { useResumeStore } from "@/client/stores/resume";

const CustomSection = () => {
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);
  const addSection = useResumeStore((state) => state.addSection);

  return (
    <>
      {Object.values(customSections).map((section) => (
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
      </Button>
    </>
  );
};

export const SectionMapping: { [key in ResumeSections]?: React.ReactElement } = {
  [ResumeSections.BASICS]: <BasicsSection />,
  [ResumeSections.SUMMARY]: <SummarySection />,
  [ResumeSections.PROFILES]: (
    <SectionBase<Profile>
      id={ResumeSections.PROFILES}
      title={(item) => item.network}
      description={(item) => item.username}
    />
  ),
  [ResumeSections.EDUCATION]: (
    <SectionBase<Education>
      id={ResumeSections.EDUCATION}
      title={(item) => item.institution}
      description={(item) => item.area}
    />
  ),
  [ResumeSections.EXPERIENCE]: (
    <SectionBase<Experience>
      id={ResumeSections.EXPERIENCE}
      title={(item) => item.company}
      description={(item) => item.position}
    />
  ),
  [ResumeSections.SKILLS]: (
    <SectionBase<Skill>
      id={ResumeSections.SKILLS}
      title={(item) => item.name}
      description={(item) => {
        if (item.description) return item.description;
        if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
      }}
    />
  ),
  [ResumeSections.LANGUAGES]: (
    <SectionBase<Language>
      id={ResumeSections.LANGUAGES}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.AWARDS]: (
    <SectionBase<Award>
      id={ResumeSections.AWARDS}
      title={(item) => item.title}
      description={(item) => item.awarder}
    />
  ),
  [ResumeSections.CERTIFICATIONS]: (
    <SectionBase<Certification>
      id={ResumeSections.CERTIFICATIONS}
      title={(item) => item.name}
      description={(item) => item.issuer}
    />
  ),
  [ResumeSections.INTERESTS]: (
    <SectionBase<Interest>
      id={ResumeSections.INTERESTS}
      title={(item) => item.name}
      description={(item) => {
        if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
      }}
    />
  ),
  [ResumeSections.PROJECTS]: (
    <SectionBase<Project>
      id={ResumeSections.PROJECTS}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.PUBLICATIONS]: (
    <SectionBase<Publication>
      id={ResumeSections.PUBLICATIONS}
      title={(item) => item.name}
      description={(item) => item.publisher}
    />
  ),
  [ResumeSections.VOLUNTEER]: (
    <SectionBase<Volunteer>
      id={ResumeSections.VOLUNTEER}
      title={(item) => item.organization}
      description={(item) => item.position}
    />
  ),
  [ResumeSections.REFERENCES]: (
    <SectionBase<Reference>
      id={ResumeSections.REFERENCES}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.CUSTOM]: <CustomSection />,
};
