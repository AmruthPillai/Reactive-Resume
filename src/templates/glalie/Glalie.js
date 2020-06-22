import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const Glalie = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

  const Photo = () =>
    data.profile.photo !== '' && (
      <img
        className="w-40 h-40 rounded-full mx-auto"
        src={data.profile.photo}
        alt="Resume Photograph"
      />
    );

  const FullName = () => (
    <div className="text-4xl font-bold leading-none">
      <h1>{data.profile.firstName}</h1>
      <h1>{data.profile.lastName}</h1>
    </div>
  );

  const Subtitle = () => (
    <div className="tracking-wide text-xs uppercase font-medium">{data.profile.subtitle}</div>
  );

  const ContactItem = ({ title, value }) =>
    value && (
      <div className="flex flex-col">
        <h6 className="text-xs font-bold" style={{ color: theme.colors.accent }}>
          {title}
        </h6>
        <p className="text-sm">{value}</p>
      </div>
    );

  const ContactInformation = () => (
    <div
      className="w-full border-2 pl-4 pr-4 mb-6"
      style={{
        borderColor: theme.colors.accent,
      }}
    >
      <div
        className="inline-block relative px-4"
        style={{ top: '-.75em', color: theme.colors.accent }}
      >
        <h2 className="flex">
          <i className="material-icons">flare</i>
        </h2>
      </div>

      <div className="grid grid-cols-1 row-gap-4">
        <ContactItem title={data.contact.phone.heading} value={data.contact.phone.value} />
        <ContactItem title={data.contact.email.heading} value={data.contact.email.value} />
        <ContactItem title={data.contact.website.heading} value={data.contact.website.value} />

        <div className="flex flex-col">
          <i className="material-icons text-lg" style={{ color: theme.colors.accent }}>
            home
          </i>
          <p className="text-sm">{data.contact.address.line1}</p>
          <p className="text-sm">{data.contact.address.line2}</p>
          <p className="text-sm">{data.contact.address.line3}</p>
        </div>
      </div>
    </div>
  );

  const Heading = ({ title }) => (
    <h6
      className="text-sm font-semibold uppercase pb-1 mb-2 border-b"
      style={{ borderColor: theme.colors.accent, color: theme.colors.accent }}
    >
      {title}
    </h6>
  );

  const Objective = () =>
    data.objective.enable && (
      <div>
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm text-justify" source={data.objective.body} />
      </div>
    );

  const WorkItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold text-sm">{x.title}</h6>
          <p className="text-xs opacity-75 font-medium">
            {x.role} / {x.start} - {x.end}
          </p>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Work = () =>
    data.work &&
    data.work.enable && (
      <div>
        <Heading title={data.work.heading} />
        {data.work.items.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="mt-3">
      <div>
        <h6 className="font-semibold text-xs">{x.name}</h6>
        <p className="text-xs opacity-75">{x.major}</p>
        <p className="text-xs opacity-75">
          {x.start} - {x.end}
        </p>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div>
        <Heading title={data.education.heading} />
        <div className="grid grid-cols-2 gap-4">
          {data.education.items.filter(x => x.enable).map(EducationItem)}
        </div>
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="mt-3 text-left">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div>
        <Heading title={data.awards.heading} />
        {data.awards.items.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="mt-3 text-left">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
      <div>
        <Heading title={data.certifications.heading} />
        {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const SkillItem = x => (
    <li key={x.id} className="text-xs font-medium">
      {x.skill}
    </li>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <ul className="pt-2 grid grid-cols-2 gap-3">{data.skills.items.map(SkillItem)}</ul>
      </div>
    );

  const HobbyItem = x => (
    <li key={x.id} className="text-xs font-medium">
      {x.hobby}
    </li>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <ul className="pt-2 grid grid-cols-2 row-gap-3 text-left">
          {data.hobbies.items.map(HobbyItem)}
        </ul>
      </div>
    );

  const LanguageItem = x => (
    <div key={x.id} className="grid grid-cols-2 items-center py-2">
      <h6 className="text-xs font-medium text-left">{x.key}</h6>
      <div className="flex">
        {x.level && <div className="font-bold text-sm mr-2">{x.level}</div>}
        {x.rating !== 0 && (
          <div className="flex">
            {Array.from(Array(x.rating)).map((_, i) => (
              <i key={i} className="material-icons text-lg" style={{ color: theme.colors.accent }}>
                star
              </i>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const Languages = () =>
    data.languages &&
    data.languages.enable && (
      <div>
        <Heading title={data.languages.heading} />
        <div className="w-3/4">{data.languages.items.filter(x => x.enable).map(LanguageItem)}</div>
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
        <div className="grid grid-cols-3 gap-8">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const ExtraItem = x => (
    <tr key={x.id}>
      <td className="border font-medium px-4 py-2 text-xs">{x.key}</td>
      <td className="border px-4 py-2 text-xs">{x.value}</td>
    </tr>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <table className="mt-4 w-2/3 table-auto">
          <tbody>{data.extras.items.filter(x => x.enable).map(ExtraItem)}</tbody>
        </table>
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
          className="h-full col-span-4 p-8 grid grid-cols-1 row-gap-4 text-center"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`, minHeight: '29.7cm' }}
        >
          <div className="grid grid-cols-1 gap-2">
            <Photo />
            <FullName />
            <Subtitle />
          </div>
          <ContactInformation />
          <Objective />
          <Hobbies />
          <Languages />
          <Certifications />
        </div>

        <div className="col-span-8 p-8 grid grid-cols-1 row-gap-4">
          <Work />
          <Education />
          <Skills />
          <Awards />
          <References />
          <Extras />
        </div>
      </div>
    </div>
  );
};

export default Glalie;
