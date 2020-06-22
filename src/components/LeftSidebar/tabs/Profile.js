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

    </div>
  );
};

export default ProfileTab;
