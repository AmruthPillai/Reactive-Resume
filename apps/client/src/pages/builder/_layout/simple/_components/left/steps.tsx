import { Education, Experience, Profile, Skill } from "@reactive-resume/schema";
import { ResumeSections } from "@reactive-resume/utils";

import { BasicsSection } from "@/client/pages/builder/_components/sections/basics";
import { SectionBase } from "@/client/pages/builder/_components/sections/shared/section-base";
import { SummarySection } from "@/client/pages/builder/_components/sections/summary";

export const Steps: ResumeSections[] = [
  ResumeSections.BASICS,
  ResumeSections.SUMMARY,
  ResumeSections.PROFILES,
  ResumeSections.EDUCATION,
  ResumeSections.EXPERIENCE,
  ResumeSections.SKILLS,
];

export const StepsSection: { [key in ResumeSections]?: React.ReactElement } = {
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
};
