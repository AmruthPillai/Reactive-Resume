import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Onyx = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.body,
      }}
    >
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3 flex items-center">
          {data.profile.photo && (
            <img
              className="rounded object-cover mr-4"
              src={data.profile.photo}
              alt="Resume Photograph"
              style={{ width: '120px', height: '120px' }}
            />
          )}
          <div>
            <h1 className="font-bold text-4xl" style={{ color: theme.colors.accent }}>
              {data.profile.firstName} {data.profile.lastName}
            </h1>
            <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>

            <div className="flex flex-col mt-4 text-xs">
              <span>{data.profile.address.line1}</span>
              <span>{data.profile.address.line2}</span>
              <span>{data.profile.address.line3}</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 text-xs">
          {data.profile.phone && (
            <div className="flex items-center my-3">
              <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
                phone
              </span>
              <span className="font-medium">{data.profile.phone}</span>
            </div>
          )}
          {data.profile.website && (
            <div className="flex items-center my-3">
              <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
                language
              </span>
              <span className="font-medium">{data.profile.website}</span>
            </div>
          )}
          {data.profile.email && (
            <div className="flex items-center my-3">
              <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
                alternate_email
              </span>
              <span className="font-medium">{data.profile.email}</span>
            </div>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {data.objective.enable && (
        <div>
          <h6
            className="text-xs font-bold uppercase mt-6 mb-2"
            style={{ color: theme.colors.accent }}
          >
            {data.objective.heading}
          </h6>
          <p className="text-sm">{data.objective.body}</p>
        </div>
      )}

      {data.work.enable && (
        <div>
          <h6
            className="text-xs font-bold uppercase mt-6 mb-2"
            style={{ color: theme.colors.accent }}
          >
            {data.work.heading}
          </h6>
          {data.work.items.map(exp => (
            <div key={exp.title} className="mt-3">
              <div className="flex justify-between">
                <div>
                  <h6 className="font-semibold">{exp.title}</h6>
                  <p className="text-xs">{exp.role}</p>
                </div>
                <span className="text-xs font-medium">
                  ({exp.start} - {exp.end})
                </span>
              </div>
              <p className="mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.enable && (
        <div>
          <h6
            className="text-xs font-bold uppercase mt-6 mb-2"
            style={{ color: theme.colors.accent }}
          >
            {data.education.heading}
          </h6>
          {data.education.items.map(edu => (
            <div key={edu.name} className="mt-3">
              <div className="flex justify-between">
                <div>
                  <h6 className="font-semibold">{edu.name}</h6>
                  <p className="text-xs">{edu.major}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">{edu.grade}</span>
                  <span className="text-xs font-medium">
                    ({edu.start} - {edu.end})
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2">
        {data.awards.enable && (
          <div>
            <h6
              className="text-xs font-bold uppercase mt-6 mb-2"
              style={{ color: theme.colors.accent }}
            >
              {data.awards.heading}
            </h6>
            {data.awards.items.map(x => (
              <div key={x.title} className="mt-3">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs">{x.subtitle}</p>
              </div>
            ))}
          </div>
        )}

        {data.certifications.enable && (
          <div>
            <h6
              className="text-xs font-bold uppercase mt-6 mb-2"
              style={{ color: theme.colors.accent }}
            >
              {data.certifications.heading}
            </h6>
            {data.certifications.items.map(x => (
              <div key={x.title} className="mt-3">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs">{x.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {data.skills.enable && (
        <div>
          <h6
            className="text-xs font-bold uppercase mt-6 mb-2"
            style={{ color: theme.colors.accent }}
          >
            {data.skills.heading}
          </h6>
          <div className="mt-1 flex flex-wrap">
            {data.skills.items.map(x => (
              <span
                key={x}
                className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
                style={{ backgroundColor: theme.colors.body, color: theme.colors.background }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.extras.enable && (
        <div>
          <h6
            className="text-xs font-bold uppercase mt-6 mb-2"
            style={{ color: theme.colors.accent }}
          >
            {data.extras.heading}
          </h6>
          <table className="w-2/3 table-auto">
            <tbody>
              {data.extras.items.map(x => (
                <tr key={x.key}>
                  <td className="border font-medium px-4 py-2 text-sm">{x.key}</td>
                  <td className="border px-4 py-2 text-sm">{x.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Onyx;
