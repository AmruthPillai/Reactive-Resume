import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Onyx = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo && (
      <img
        className="rounded object-cover mr-4"
        src={data.profile.photo}
        alt="Resume Photograph"
        style={{ width: '120px', height: '120px' }}
      />
    );

  const Profile = () => (
    <div>
      <h1 className="font-bold text-4xl" style={{ color: theme.colors.accent }}>
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>

      <div className="flex flex-col mt-4 text-xs">
        <span>{data.contact.address.line1}</span>
        <span>{data.contact.address.line2}</span>
        <span>{data.contact.address.line3}</span>
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
    <h6 className="text-xs font-bold uppercase mt-6 mb-2" style={{ color: theme.colors.accent }}>
      {title}
    </h6>
  );

  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div>
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm" source={data.objective.body} />
      </div>
    );

  const WorkItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
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
        {data.work.items.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.name}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{x.grade}</span>
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
        {data.education.items.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="mt-3">
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
    <div key={x.id} className="mt-3">
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

  const HobbyItem = x => (
    <span
      key={x.id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
      }}
    >
      {x.hobby}
    </span>
  );

  const Hobbies = () =>
    data.hobbies &&
    data.hobbies.enable && (
      <div>
        <Heading title={data.hobbies.heading} />
        <div className="mt-1 flex flex-wrap">{data.hobbies.items.map(HobbyItem)}</div>
      </div>
    );

  const SkillItem = x => (
    <span
      key={x.id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
      }}
    >
      {x.skill}
    </span>
  );

  const Skills = () =>
    data.skills &&
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <div className="mt-1 flex flex-wrap">{data.skills.items.map(SkillItem)}</div>
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
        <div className="grid grid-cols-3 gap-6">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const ExtraItem = x => (
    <tr key={x.id}>
      <td className="border font-medium px-4 py-2 text-sm">{x.key}</td>
      <td className="border px-4 py-2 text-sm">{x.value}</td>
    </tr>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <table className="table-auto">
          <tbody>{data.extras.items.filter(x => x.enable).map(ExtraItem)}</tbody>
        </table>
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
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3 flex items-center">
          <Photo />
          <Profile />
        </div>

        <div className="col-span-1 text-xs">
          <ContactItem icon="phone" value={data.contact.phone.value} link={`tel:${data.contact.phone.value}`} />
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
      </div>

      <hr className="my-6" />

      <Objective />
      <Work />
      <Education />

      <div className="grid grid-cols-2 gap-6">
        <Awards />
        <Certifications />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Skills />
        <Hobbies />
      </div>

      <References />

      <div className="grid grid-cols-2 gap-6">
        <Extras />
        <Languages />
      </div>
    </div>
  );
};

export default Onyx;
