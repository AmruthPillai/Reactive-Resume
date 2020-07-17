import React, { memo } from 'react';
import PageContext from '../contexts/PageContext';
import AwardsA from './blocks/Awards/AwardsA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import Contact from './blocks/Contact/ContactA';
import EducationA from './blocks/Education/EducationA';
import HeadingA from './blocks/Heading/HeadingA';
import HobbiesA from './blocks/Hobbies/HobbiesA';
import LanguagesA from './blocks/Languages/LanguagesA';
import ObjectiveA from './blocks/Objective/ObjectiveA';
import ProjectsA from './blocks/Projects/ProjectsA';
import ReferencesA from './blocks/References/ReferencesA';
import SkillsA from './blocks/Skills/SkillsA';
import WorkA from './blocks/Work/WorkA';

const Blocks = {
  objective: ObjectiveA,
  work: WorkA,
  education: EducationA,
  projects: ProjectsA,
  awards: AwardsA,
  certifications: CertificationsA,
  skills: SkillsA,
  hobbies: HobbiesA,
  languages: LanguagesA,
  references: ReferencesA,
};

const Onyx = ({ data }) => {
  const layout = data.metadata.layout.onyx;

  return (
    <PageContext.Provider value={{ data, heading: HeadingA }}>
      <div
        id="page"
        className="p-8 rounded"
        style={{
          fontFamily: data.metadata.font,
          color: data.metadata.colors.text,
          backgroundColor: data.metadata.colors.background,
        }}
      >
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3 flex items-center">
            {data.profile.photograph && (
              <img
                className="rounded object-cover mr-4"
                src={data.profile.photograph}
                alt="Resume Photograph"
                style={{ width: '120px', height: '120px' }}
              />
            )}

            <div>
              <h1
                className="font-bold text-4xl"
                style={{ color: data.metadata.colors.primary }}
              >
                {data.profile.firstName} {data.profile.lastName}
              </h1>
              <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>

              <div className="flex flex-col mt-4 text-xs">
                <span>{data.profile.address.line1}</span>
                <span>{data.profile.address.line2}</span>
                <span>
                  {data.profile.address.city} {data.profile.address.pincode}
                </span>
              </div>
            </div>
          </div>

          <Contact />
        </div>

        <hr
          className="my-5 opacity-25"
          style={{ borderColor: data.metadata.colors.text }}
        />

        <div className="grid gap-4">
          {layout[0] &&
            layout[0].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}

          <div className="grid grid-cols-2 gap-4">
            {layout[1] &&
              layout[1].map((x) => {
                const Component = Blocks[x];
                return Component && <Component key={x} />;
              })}
          </div>

          {layout[2] &&
            layout[2].map((x) => {
              const Component = Blocks[x];
              return Component && <Component key={x} />;
            })}
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default memo(Onyx);
