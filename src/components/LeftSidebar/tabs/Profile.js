import React from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '../../../shared/TextField';

const ProfileTab = ({ data, onChange }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('profile.photoUrl.label')}
        placeholder="https://i.imgur.com/..."
        value={data.profile.photo}
        onChange={v => onChange('data.profile.photo', v)}
      />

      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('profile.firstName.label')}
          placeholder="Jane"
          value={data.profile.firstName}
          onChange={v => onChange('data.profile.firstName', v)}
        />

        <TextField
          className="mb-6"
          label={t('profile.lastName.label')}
          placeholder="Doe"
          value={data.profile.lastName}
          onChange={v => onChange('data.profile.lastName', v)}
        />
      </div>

      <TextField
        className="mb-6"
        label={t('profile.subtitle.label')}
        placeholder="Full-Stack Web Developer"
        value={data.profile.subtitle}
        onChange={v => onChange('data.profile.subtitle', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.address.line1.label')}
        placeholder="Palladium Complex"
        value={data.profile.address.line1}
        onChange={v => onChange('data.profile.address.line1', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.address.line2.label')}
        placeholder="140 E 14th St"
        value={data.profile.address.line2}
        onChange={v => onChange('data.profile.address.line2', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.address.line3.label')}
        placeholder="New York, NY 10003 USA"
        value={data.profile.address.line3}
        onChange={v => onChange('data.profile.address.line3', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('profile.phone.label')}
        placeholder="+1 541 754 3010"
        value={data.profile.phone}
        onChange={v => onChange('data.profile.phone', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.website.label')}
        placeholder="janedoe.me"
        value={data.profile.website}
        onChange={v => onChange('data.profile.website', v)}
      />

      <TextField
        className="mb-6"
        label={t('profile.email.label')}
        placeholder="jane.doe@example.com"
        value={data.profile.email}
        onChange={v => onChange('data.profile.email', v)}
      />
    </div>
  );
};

export default ProfileTab;
