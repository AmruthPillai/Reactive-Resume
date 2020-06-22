import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const styles = {
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    color: 'white',
    backgroundColor: '#222',
    height: '160px',
    paddingLeft: '270px',
  },
  section: {
    marginTop: '167px',
    marginLeft: '20px',
  },
};

const Celebi = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

  const Heading = ({ title, className }) => (
    <h5
      className={`my-2 text-md uppercase font-semibold tracking-wider pb-1 border-b-2 border-gray-800 ${className}`}
    >
      {title}
    </h5>
  );

  const Photo = () =>
    data.profile.photo !== '' && (
      <div className="relative z-40">
        <img
          className="w-full object-cover object-center"
          src={data.profile.photo}
          alt="Resume Photograph"
          style={{
            height: '160px',
          }}
        />
      </div>
    );

  const Header = () => (
    <header style={styles.header}>
      <div className="ml-6">
        <h1 className="tracking-wide uppercase font-semibold" style={{ fontSize: '2.75em' }}>
          {data.profile.firstName} {data.profile.lastName}
        </h1>
        <h6 className="text-lg tracking-wider uppercase">{data.profile.subtitle}</h6>
      </div>
    </header>
  );

  const Objective = () =>
    data.objective &&
    data.objective.enable && (
      <div className="mb-6">
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="my-3 mr-10 text-sm" source={data.objective.body} />
      </div>
    );

  const ContactItem = ({ label, value }) =>
    value && (
      <div className="mb-3">
        <h6 className="text-xs font-bold">{label}</h6>
        <p className="text-sm">{value}</p>
      </div>
    );

  const Contact = () => (
    <div className="mb-6">
      <Heading title={data.contact.heading} className="mt-8 w-3/4 mx-auto" />
      <div className="mb-3">
        <h6 className="text-xs font-bold">{data.contact.address.heading}</h6>
        <p className="text-sm">{data.contact.address.line1}</p>
        <p className="text-sm">{data.contact.address.line2}</p>
        <p className="text-sm">{data.contact.address.line3}</p>
      </div>
      <ContactItem label="Phone" value={data.contact.phone.value} />
      <ContactItem label="Email Address" value={data.contact.email.value} />
      <ContactItem label="Website" value={data.contact.website.value} />
    </div>
  );

  const WorkItem = x => (
    <div key={x.id} className="my-3 mr-10">
      <div>
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs text-gray-800">
          {x.role} | {x.start} - {x.end}
        </p>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Work = () =>
    data.work &&
    data.work.enable && (
      <div className="mb-6">
        <Heading title={data.work.heading} />
        {data.work.items.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="my-3 mr-10">
      <h6 className="font-semibold">{x.name}</h6>
      <p className="text-xs">{x.major}</p>
      <div className="text-xs">
        {x.start} - {x.end}
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education &&
    data.education.enable && (
      <div className="mb-6">
        <Heading title={data.education.heading} />
        {data.education.items.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const Skills = () =>
    data.skills.enable && (
      <div className="mb-6">
        <Heading title="Skills" className="w-3/4 mx-auto" />
        <ul className="list-none text-sm">
          {data.skills.items.map(x => (
            <li key={x.id} className="my-2">
              {x.skill}
            </li>
          ))}
        </ul>
      </div>
    );

  const Hobbies = () =>
    data.hobbies.enable && (
      <div className="mb-6">
        <Heading title="Hobbies" className="w-3/4 mx-auto" />
        <ul className="list-none text-sm">
          {data.hobbies.items.map(x => (
            <li key={x.id} className="my-2">
              {x.hobby}
            </li>
          ))}
        </ul>
      </div>
    );

  const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
      <h6 className="text-sm font-semibold">{x.name}</h6>
      <span className="text-sm">{x.position}</span>
      <span className="text-sm">{x.phone}</span>
      <span className="text-sm">{x.email}</span>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const References = () =>
    data.references &&
    data.references.enable && (
      <div className="mb-6">
        <Heading title={data.references.heading} />
        <div className="grid grid-cols-2 col-gap-4 row-gap-2">
          {data.references.items.filter(x => x.enable).map(ReferenceItem)}
        </div>
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
      <div className="w-3/4 mx-auto mb-6">
        <Heading title={data.languages.heading} />
        <div>{data.languages.items.filter(x => x.enable).map(LanguageItem)}</div>
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="my-2">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Awards = () =>
    data.awards &&
    data.awards.enable && (
      <div className="mb-6">
        <Heading light title={data.awards.heading} />
        {data.awards.items.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="my-2">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
      <div className="mb-6">
        <Heading title={data.certifications.heading} className="w-3/4 mx-auto" />
        {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const ExtraItem = x => (
    <div key={x.id} className="my-3">
      <h6 className="text-xs font-bold">{x.key}</h6>
      <div className="text-sm">{x.value}</div>
    </div>
  );

  const Extras = () =>
    data.extras &&
    data.extras.enable && (
      <div className="mb-6">
        <Heading title={data.extras.heading} className="w-3/4 mx-auto" />
        {data.extras.items.filter(x => x.enable).map(ExtraItem)}
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
          className="sidebar col-span-4 pb-8 ml-8 z-10 text-center"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Photo />
          <Contact />
          <Skills />
          <Hobbies />
          <Languages />
          <Certifications />
          <Extras />
        </div>
        <div className="col-span-8">
          <Header />

          <section className="py-4" style={styles.section}>
            <Objective />
            <Work />
            <Education />
            <Awards />
            <References />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Celebi;
