import React from 'react';
import PageContext from '../contexts/PageContext';
import AwardsA from './blocks/Awards/AwardsA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import ContactC from './blocks/Contact/ContactC';
import EducationA from './blocks/Education/EducationA';
import HeadingD from './blocks/Heading/HeadingD';
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

const Castform = ({ data }) => {
  const layout = data.metadata.layout.castform;

  const Photo = () =>
    data.profile.photograph !== '' && (
      <img
        className="w-32 h-32 rounded-full"
        style={{
          borderWidth: 6,
          borderColor: data.metadata.colors.background,
        }}
        src={data.profile.photograph}
        alt={data.profile.firstName}
      />
    );

  const Profile = () => (
    <div>
      <h1 className="text-2xl font-bold">
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h5>{data.profile.subtitle}</h5>
    </div>
  );

  return (
    <PageContext.Provider value={{ data, heading: HeadingD }}>
      <div
        id="page"
        className="rounded"
        style={{
          fontFamily: data.metadata.font,
          color: data.metadata.colors.text,
          backgroundColor: data.metadata.colors.background,
        }}
      >
        <div className="grid grid-cols-12">
          <div
            className="col-span-4 py-8 pr-8 pl-5"
            style={{
              color: data.metadata.colors.background,
              backgroundColor: data.metadata.colors.primary,
            }}
          >
            <div className="grid gap-4">
              <Photo />
              <Profile />

              <div>
                <HeadingD>{data.profile.heading}</HeadingD>
                <ContactC />
              </div>

              {layout[0] &&
                layout[0].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
          <div className="col-span-8 py-8 pr-8 pl-5">
            <div className="grid gap-4">
              {layout[1] &&
                layout[1].map((x) => {
                  const Component = Blocks[x];
                  return Component && <Component key={x} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default Castform;
