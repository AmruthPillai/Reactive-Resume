import { get } from 'lodash';
import React, { memo, useContext } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import Icons from '../Icons';

const ContactItem = ({ value, icon, link }) => {
  const { data } = useContext(PageContext);
  const Icon = get(Icons, icon.toLowerCase(), FaCaretRight);

  return value ? (
    <div className="flex items-center">
      <Icon
        size="10px"
        className="mr-2"
        style={{ color: data.metadata.colors.background }}
      />
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

const ContactA = () => {
  const { data } = useContext(PageContext);

  return (
    <div className="text-xs grid gap-2">
      <ContactItem
        icon="phone"
        value={data.profile.phone}
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        icon="website"
        value={data.profile.website}
        link={data.profile.website}
      />
      <ContactItem
        icon="email"
        value={data.profile.email}
        link={`mailto:${data.profile.email}`}
      />

      {safetyCheck(data.social) &&
        data.social.items.map((x) => (
          <ContactItem
            key={x.id}
            value={x.username}
            icon={x.network}
            link={x.url}
          />
        ))}
    </div>
  );
};

export default memo(ContactA);
