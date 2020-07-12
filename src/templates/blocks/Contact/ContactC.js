import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const ContactItem = ({ value, label, link }) => {
  return value ? (
    <div className="flex flex-col">
      <h6 className="capitalize font-semibold">{label}</h6>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{value}</span>
        </a>
      ) : (
        <span className="font-medium break-all">{value}</span>
      )}
    </div>
  ) : null;
};

const ContactC = () => {
  const { data } = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
      <div>
        <h6 className="capitalize font-semibold">Address</h6>
        <div className="flex flex-col text-xs">
          <span>{data.profile.address.line1}</span>
          <span>{data.profile.address.line2}</span>
          <span>
            {data.profile.address.city} {data.profile.address.pincode}
          </span>
        </div>
      </div>

      <ContactItem
        label="phone"
        value={data.profile.phone}
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label="website"
        value={data.profile.website}
        link={`http://${data.profile.website}`}
      />
      <ContactItem
        label="email"
        value={data.profile.email}
        link={`mailto:${data.profile.email}`}
      />

      {safetyCheck(data.social) &&
        data.social.items.map((x) => (
          <ContactItem
            key={x.id}
            value={x.username}
            label={x.network}
            link={x.url}
          />
        ))}
    </div>
  );
};

export default memo(ContactC);
