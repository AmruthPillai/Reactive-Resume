import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const Gengar = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent);

  const Photo = () =>
    data.profile.photo !== '' && (
      <img
        className="w-24 h-24 rounded-full mr-4 object-cover border-4"
        style={{
          borderColor: theme.colors.background,
        }}
        src={data.profile.photo}
        alt="Resume Photograph"
      />
    );

  const FullName = () => (
    <div>
      <h1 className="text-2xl font-bold">{data.profile.firstName}</h1>
      <h1 className="text-2xl font-bold">{data.profile.lastName}</h1>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center mb-3">
        <div
          className="w-5 h-5 rounded-full flex justify-center items-center mr-2"
          style={{ backgroundColor: theme.colors.background }}
        >
          <i
            className="flex justify-center items-center material-icons text-xs"
            style={{ color: theme.colors.accent }}
          >
            {icon}
          </i>
        </div>
        <a href={link}>
          <span className="text-sm font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <h6 className="font-bold text-xs uppercase tracking-wide mb-2">{title}</h6>
  );

  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div className="flex flex-col justify-center items-start mb-6">
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm" source={data.objective.body} />
      </div>
    );

  const SkillItem = x => (
    <li key={x} className="text-sm py-1">
      {x}
    </li>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div className="mb-6">
        <Heading title={data.skills.heading} />
        <ul>{data.skills.items.map(SkillItem)}</ul>
      </div>
    );

  const EducationItem = x => (
    <div key={x.name} className="mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">
            {x.name}
            <small className="ml-2">
              {x.start !== '' && x.end !== '' && (
                <span className="text-xs font-medium">
                  ({x.start} - {x.end})
                </span>
              )}
            </small>
          </h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col text-right items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {x.grade}
          </span>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div className="mb-6">
        <Heading title={data.education.heading} />
        {data.education.items.map(EducationItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.title} className="mb-3">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
      <div className="mb-6">
        <Heading title={data.certifications.heading} />
        {data.certifications.items.map(CertificationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.title} className="mb-3">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div className="mb-6">
        <Heading title={data.awards.heading} />
        {data.awards.items.map(AwardItem)}
      </div>
    );

  const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
      <h6 className="text-sm font-medium">{x.name}</h6>
      <span className="text-xs">{x.position}</span>
      <span className="text-xs">{x.phone}</span>
      <span className="text-xs">{x.email}</span>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const References = () =>
    data.references &&
    data.references.enable && (
      <div>
        <Heading title={data.references.heading} />
        <div className="grid grid-cols-2 gap-6">{data.references.items.map(ReferenceItem)}</div>
      </div>
    );

  const WorkItem = x => (
    <div key={x.title} className="mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">{x.title}</h6>
          <p className="text-xs">{x.role}</p>
        </div>
        <span className="text-xs font-medium">
          ({x.start} - {x.end})
        </span>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Work = () =>
    data.work &&
    data.work.enable && (
      <div className="mb-6">
        <Heading title={data.work.heading} />
        {data.work.items.map(WorkItem)}
      </div>
    );

  const LanguageItem = x => (
    <div key={x.id} className="grid grid-cols-2 items-center py-2">
      <h6 className="text-sm font-medium">{x.key}</h6>
      <div className="flex">
        {Array.from(Array(x.value)).map((_, i) => (
          <i key={i} className="material-icons text-lg" style={{ color: theme.colors.accent }}>
            star
          </i>
        ))}
      </div>
    </div>
  );

  const Languages = () =>
    data.languages &&
    data.languages.enable && (
      <div>
        <Heading title={data.languages.heading} />
        <div className="mb-6">{data.languages.items.map(LanguageItem)}</div>
      </div>
    );

  const ExtraItem = x => (
    <div key={x.key} className="text-sm my-1">
      <h6 className="text-xs font-bold">{x.key}</h6>
      <h6>{x.value}</h6>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <div className="grid grid-cols-2">{data.extras.items.map(ExtraItem)}</div>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12">
        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
        >
          <div className="flex items-center">
            <Photo />
            <FullName />
          </div>

          <hr className="w-1/4 my-5 opacity-50" />

          <ContactItem icon="phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
          <ContactItem
            icon="alternate_email"
            value={data.profile.email}
            link={`mailto:${data.profile.email}`}
          />
          <ContactItem
            icon="language"
            value={data.profile.website}
            link={`http://${data.profile.website}`}
          />
          <ContactItem icon="location_on" value={data.profile.address.line3} />
        </div>

        <div
          className="col-span-8 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Objective />
          <Extras />
        </div>

        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Skills />
          <Languages />
          <Education />
          <Certifications />
        </div>

        <div className="col-span-8 px-6 py-8">
          <Work />
          <Awards />
          <References />
        </div>
      </div>
    </div>
  );
};

export default Gengar;
