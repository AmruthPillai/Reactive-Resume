import { SectionKey } from "@reactive-resume/schema";

import { TemplateProps } from "../../shared";
import { Awards } from "./sections/awards";
import { Certifications } from "./sections/certifications";
import { CustomSection } from "./sections/custom";
import { Education } from "./sections/education";
import { Experience } from "./sections/experience";
import { Header } from "./sections/header";
import { Interests } from "./sections/interests";
import { Languages } from "./sections/languages";
import { Profiles } from "./sections/profiles";
import { Projects } from "./sections/projects";
import { Publications } from "./sections/publications";
import { References } from "./sections/references";
import { Skills } from "./sections/skills";
import { Summary } from "./sections/summary";
import { Volunteer } from "./sections/volunteer";
import { RhyhornWrapper } from "./style";

const sectionMap: Partial<Record<SectionKey, () => React.ReactNode>> = {
  summary: Summary,
  profiles: Profiles,
  experience: Experience,
  education: Education,
  awards: Awards,
  skills: Skills,
  certifications: Certifications,
  interests: Interests,
  languages: Languages,
  volunteer: Volunteer,
  projects: Projects,
  publications: Publications,
  references: References,
};

const getSection = (id: SectionKey) => {
  const Section = sectionMap[id];

  // Custom Section
  if (!Section) return <CustomSection key={id} id={id} />;

  return <Section key={id} />;
};

export const Rhyhorn = ({ isFirstPage, columns }: TemplateProps) => (
  <RhyhornWrapper>
    {isFirstPage && <Header />}

    {/* Main */}
    {columns[0].map(getSection)}

    {/* Sidebar */}
    {columns[1].map(getSection)}
  </RhyhornWrapper>
);
