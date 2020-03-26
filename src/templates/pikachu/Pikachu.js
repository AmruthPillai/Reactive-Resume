import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Pikachu = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () => <img className="rounded-full object-cover" src={data.profile.photo} alt="" />;

  const Header = () => (
    <div
      className="rounded flex flex-col justify-center"
      style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
    >
      <div className="flex flex-col justify-center mx-8 my-6">
        <h1 className="text-3xl font-bold leading-tight">
          {data.profile.firstName} {data.profile.lastName}
        </h1>
        <div className="text-sm font-medium tracking-wide">{data.profile.subtitle}</div>

        <hr className="my-4 opacity-50" />

        <div className="text-sm">{data.objective.body}</div>
      </div>
    </div>
  );

  const ContactItem = ({ icon, value }) =>
    value && (
      <div className="flex items-center my-3">
        <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
          {icon}
        </span>
        <span className="font-medium">{value}</span>
      </div>
    );

  const SectionHeading = ({ title }) => (
    <div
      className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
      style={{ color: theme.colors.accent, borderColor: theme.colors.accent }}
    >
      {title}
    </div>
  );

  const SkillItem = x => (
    <span
      key={x}
      className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
    >
      {x}
    </span>
  );

  const ExtraItem = x => (
    <div key={x.key} className="text-sm my-1">
      <h6 className="text-xs font-bold">{x.key}</h6>
      <h6 className="">{x.value}</h6>
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
      <p className="mt-2 text-sm">{x.description}</p>
    </div>
  );

  const EducationItem = x => (
    <div key={x.name} className="mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="font-semibold">{x.name}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {x.grade}
          </span>
          <span className="text-xs font-medium">
            ({x.start} - {x.end})
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm">{x.description}</p>
    </div>
  );

  const AwardCertificationItem = x => (
    <div key={x.title} className="mb-3">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
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
      <div className="grid grid-cols-8 col-gap-6 row-gap-8">
        {data.profile.photo !== '' && (
          <div className="self-center col-span-2">
            <Photo />
          </div>
        )}

        <div className={`${data.profile.photo !== '' ? 'col-span-6' : 'col-span-8'}`}>
          <Header />
        </div>

        <div className="col-span-2">
          <div className="text-sm mb-6">
            <ContactItem icon="phone" value={data.profile.phone} />
            <ContactItem icon="language" value={data.profile.website} />
            <ContactItem icon="alternate_email" value={data.profile.email} />
            <ContactItem icon="location_on" value={data.profile.address.line3} />
          </div>

          {data.skills.enable && (
            <div>
              <SectionHeading title={data.skills.heading} />
              <div className="flex flex-col mb-6">{data.skills.items.map(SkillItem)}</div>
            </div>
          )}

          {data.extras.enable && (
            <div>
              <SectionHeading title={data.extras.heading} />
              <div className="flex flex-col">{data.extras.items.map(ExtraItem)}</div>
            </div>
          )}
        </div>

        <div className="col-span-6">
          {data.work.enable && (
            <div>
              <SectionHeading title={data.work.heading} />
              <div className="flex flex-col mb-4">{data.work.items.map(WorkItem)}</div>
            </div>
          )}

          {data.education.enable && (
            <div>
              <SectionHeading title={data.education.heading} />
              <div className="flex flex-col mb-4">{data.education.items.map(EducationItem)}</div>
            </div>
          )}

          {data.awards.enable && (
            <div>
              <SectionHeading title={data.awards.heading} />
              <div className="flex flex-col mb-4">
                {data.awards.items.map(AwardCertificationItem)}
              </div>
            </div>
          )}

          {data.certifications.enable && (
            <div>
              <SectionHeading title={data.certifications.heading} />
              <div className="flex flex-col mb-4">
                {data.certifications.items.map(AwardCertificationItem)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pikachu;
