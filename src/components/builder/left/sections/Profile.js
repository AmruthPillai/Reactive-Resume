import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import PhotoUpload from '../../../shared/PhotoUpload';

const Profile = ({ id }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading id={id} />

      <Input
        name="heading"
        label={t('builder.sections.heading')}
        path={`${id}.heading`}
      />

      <PhotoUpload />

      <div className="grid grid-cols-2 gap-6">
        <Input
          name="firstName"
          label={t('builder.profile.firstName')}
          path="profile.firstName"
        />
        <Input
          name="lastName"
          label={t('builder.profile.lastName')}
          path="profile.lastName"
        />
      </div>

      <Input
        name="subtitle"
        label={t('shared.forms.subtitle')}
        path="profile.subtitle"
      />

      <hr />

      <Input
        name="addressLine1"
        label={t('builder.profile.address.line1')}
        path="profile.address.line1"
      />
      <Input
        name="addressLine2"
        label={t('builder.profile.address.line2')}
        path="profile.address.line2"
      />

      <div className="grid grid-cols-2 gap-6">
        <Input
          name="city"
          label={t('builder.profile.address.city')}
          path="profile.address.city"
        />
        <Input
          name="pincode"
          label={t('builder.profile.address.pincode')}
          path="profile.address.pincode"
        />
      </div>

      <hr />

      <Input
        name="phone"
        label={t('shared.forms.phone')}
        path="profile.phone"
      />
      <Input
        name="website"
        label={t('shared.forms.website')}
        path="profile.website"
      />
      <Input
        name="email"
        label={t('shared.forms.email')}
        path="profile.email"
      />
    </section>
  );
};

export default memo(Profile);
