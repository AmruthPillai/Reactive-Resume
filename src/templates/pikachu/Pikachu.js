import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Pikachu = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo !== '' && (
      <div className="self-center col-span-4">
        <img
          className="w-48 h-48 rounded-full mx-auto object-cover"
          src={data.profile.photo}
          alt=""
        />
      </div>
    );

  const Header = () => (
    <div
      className="h-48 rounded flex flex-col justify-center"
      style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
    >
      <div className="flex flex-col justify-center mx-8 my-6">
        <h1 className="text-3xl font-bold leading-tight">
          {data.profile.firstName} {data.profile.lastName}
        </h1>
        <div className="text-sm font-medium tracking-wide">{data.profile.subtitle}</div>

        <hr className="my-4 opacity-50" />

        <ReactMarkdown className="text-sm" source={data.objective.body} />
      </div>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center my-3">
        <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
          {icon}
        </span>
        <a href={link}>
          <span className="font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <div
      className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
      style={{ color: theme.colors.accent, borderColor: theme.colors.accent }}
    >
      {title}
    </div>
  );

  const SkillItem = x => (
    <span
      key={x.id}
      className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
    >
      {x.skill}
    </span>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <div className="flex flex-col mb-6">{data.skills.items.map(SkillItem)}</div>
      </div>
    );

  const HobbyItem = x => (
    <span
      key={x.id}
      className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
    >
      {x.hobby}
    </span>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <div className="flex flex-col mb-6">{data.hobbies.items.map(HobbyItem)}</div>
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
        <div className="grid grid-cols-2 gap-2 mb-6">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const LanguageItem = x => (
    <div key={x.id} className="grid grid-cols-2 items-center py-2">
      <h6 className="text-sm font-medium">{x.key}</h6>
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
        <div className="mb-6">{data.languages.items.filter(x => x.enable).map(LanguageItem)}</div>
      </div>
    );

  const ExtraItem = x => (
    <div key={x.id} className="text-sm my-1">
      <h6 className="text-xs font-bold">{x.key}</h6>
      <h6 className="">{x.value}</h6>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <div className="grid grid-cols-2">
          {data.extras.items.filter(x => x.enable).map(ExtraItem)}
        </div>
      </div>
    );

  const WorkItem = x => (
    <div key={x.id} className="mb-3">
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
      <div>
        <Heading title={data.work.heading} />
        <div className="flex flex-col mb-4">
          {data.work.items.filter(x => x.enable).map(WorkItem)}
        </div>
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">{x.name}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col text-right items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {x.grade}
          </span>
          <span className="text-xs font-medium">
            ({x.start} - {x.end})
          </span>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div>
        <Heading title={data.education.heading} />
        <div className="flex flex-col mb-4">
          {data.education.items.filter(x => x.enable).map(EducationItem)}
        </div>
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="mb-2">
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
        <div className="flex flex-col mb-2">
          {data.awards.items.filter(x => x.enable).map(AwardItem)}
        </div>
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="mb-3">
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
        <div className="flex flex-col mb-2">
          {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
        </div>
      </div>
    );

  return (
    <div
      className="p-10"
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12 col-gap-6 row-gap-8">
        <Photo />

        <div className={`${data.profile.photo !== '' ? 'col-span-8' : 'col-span-12'}`}>
          <Header />
        </div>

        <div className="col-span-4 overflow-hidden">
          <div className="text-sm mb-6">
            <ContactItem
              icon="phone"
              value={data.contact.phone.value}
              link={`tel:${data.contact.phone.value}`}
            />
            <ContactItem
              icon="language"
              value={data.contact.website.value}
              link={`http://${data.contact.website.value}`}
            />
            <ContactItem
              icon="email"
              value={data.contact.email.value}
              link={`mailto:${data.contact.email.value}`}
            />
            <ContactItem icon="location_on" value={data.contact.address.line3} />
          </div>

          <Skills />
          <Hobbies />
          <Languages />
          <Certifications />
        </div>

        <div className="col-span-8">
          <Work />
          <Education />
          <Awards />
          <References />
          <Extras />
        </div>
      </div>
    </div>
  );
};

export default Pikachu;
