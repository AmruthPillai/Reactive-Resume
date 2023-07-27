import find from 'lodash/find';
import get from 'lodash/get';
import React from 'react';
import { validate } from 'uuid';

export type SectionProps = {
  path: string;
  titlePath?: string | string[];
  subtitlePath?: string | string[];
  headlinePath?: string | string[];
  keywordsPath?: string;
};

const sectionMap = (Section: React.FC<SectionProps>): Record<string, JSX.Element> => ({
  work: <Section key="work" path="sections.work" titlePath="name" subtitlePath="position" />,
  education: (
    <Section
      key="education"
      path="sections.education"
      titlePath="institution"
      subtitlePath={['degree', 'area']}
      headlinePath="score"
      keywordsPath="courses"
    />
  ),
  awards: <Section key="awards" path="sections.awards" titlePath="title" subtitlePath="awarder" />,
  certifications: (
    <Section key="certifications" path="sections.certifications" titlePath="name" subtitlePath="issuer" />
  ),
  publications: <Section key="publications" path="sections.publications" titlePath="name" subtitlePath="publisher" />,
  skills: <Section key="skills" path="sections.skills" titlePath="name" keywordsPath="keywords" />,
  languages: <Section key="languages" path="sections.languages" titlePath="name" />,
  interests: <Section key="interests" path="sections.interests" titlePath="name" keywordsPath="keywords" />,
  projects: (
    <Section
      key="projects"
      path="sections.projects"
      titlePath="name"
      subtitlePath="description"
      keywordsPath="keywords"
    />
  ),
  volunteer: <Section key="volunteer" path="sections.volunteer" titlePath="organization" subtitlePath="position" />,
  references: <Section key="references" path="sections.references" titlePath="name" subtitlePath="relationship" />,
});

export const getSectionById = (id: string, Section: React.FC<SectionProps>): JSX.Element | null => {
  if (!id) return null;

  // Check if section id is a custom section (is a valid uuid)
  if (validate(id)) return <Section key={id} path={`sections.${id}`} />;

  // Check if section id is a predefined seciton in config
  const predefinedSection = get(sectionMap(Section), id);

  if (predefinedSection) {
    return predefinedSection;
  }

  // Otherwise, section must be a cloned section
  const section = find(sectionMap(Section), (_element, key) => id.includes(key));
  if (section) return React.cloneElement(section, { path: `sections.${id}` });

  return null;
};

export default sectionMap;
