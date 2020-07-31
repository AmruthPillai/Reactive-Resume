import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdFlare } from 'react-icons/md';
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

const ContactD = () => {
  const { t } = useTranslation();
  const { data } = useContext(PageContext);

  return (
    <div
      className="my-4 relative w-full border-2 grid gap-2 text-center text-xs py-5"
      style={{
        borderColor: data.metadata.colors.primary,
      }}
    >
      <div
        className="absolute text-center"
        style={{
          top: '-11px',
          left: '50%',
          marginLeft: '-10px',
          color: data.metadata.colors.primary,
        }}
      >
        <MdFlare size="20px" />
      </div>

      {data.profile.address.line1 && (
        <div>
          <h6 className="capitalize font-semibold">
            {t('shared.forms.address')}
          </h6>
          <div className="flex flex-col text-xs">
            <span>{data.profile.address.line1}</span>
            <span>{data.profile.address.line2}</span>
            <span>
              {data.profile.address.city} {data.profile.address.pincode}
            </span>
          </div>
        </div>
      )}

      <ContactItem
        label={t('shared.forms.phone')}
        value={data.profile.phone}
        link={`tel:${data.profile.phone}`}
      />
      <ContactItem
        label={t('shared.forms.website')}
        value={data.profile.website}
        link={data.profile.website}
      />
      <ContactItem
        label={t('shared.forms.email')}
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

export default memo(ContactD);
