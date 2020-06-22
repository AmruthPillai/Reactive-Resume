import React from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '../../../shared/TextField';

const ContactTab = ({ data, onChange }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <TextField
        placeholder="Contact Heading"
        value={data.contact.heading}
        onChange={v => onChange('data.contact.heading', v)}
      />

      <hr className="my-6" />

      <TextField
        placeholder="Address Heading"
        value={data.contact.address.heading}
        onChange={v => onChange('data.contact.address.heading', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.address.line1.label')}
        placeholder="Palladium Complex"
        value={data.contact.address.line1}
        onChange={v => onChange('data.contact.address.line1', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.address.line2.label')}
        placeholder="140 E 14th St"
        value={data.contact.address.line2}
        onChange={v => onChange('data.contact.address.line2', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.address.line3.label')}
        placeholder="New York, NY 10003 USA"
        value={data.contact.address.line3}
        onChange={v => onChange('data.contact.address.line3', v)}
      />

      <hr className="my-6" />

      <TextField
        placeholder="Phone Heading"
        value={data.contact.phone.heading}
        onChange={v => onChange('data.contact.phone.heading', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.phone.label')}
        placeholder="+1 541 754 3010"
        value={data.contact.phone.value}
        onChange={v => onChange('data.contact.phone.value', v)}
      />

      <hr className="my-6" />

      <TextField
        placeholder="Website Heading"
        value={data.contact.website.heading}
        onChange={v => onChange('data.contact.website.heading', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.website.label')}
        placeholder="janedoe.me"
        value={data.contact.website.value}
        onChange={v => onChange('data.contact.website.value', v)}
      />

      <hr className="my-6" />

      <TextField
        placeholder="Email Heading"
        value={data.contact.email.heading}
        onChange={v => onChange('data.contact.email.heading', v)}
      />

      <TextField
        className="mb-6"
        label={t('contact.email.label')}
        placeholder="jane.doe@example.com"
        value={data.contact.email.value}
        onChange={v => onChange('data.contact.email.value', v)}
      />
    </div>
  );
};

export default ContactTab;
