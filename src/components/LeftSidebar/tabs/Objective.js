import React from 'react';
import { useTranslation } from 'react-i18next';

import TextArea from '../../../shared/TextArea';
import TextField from '../../../shared/TextField';
import Checkbox from '../../../shared/Checkbox';

const ObjectiveTab = ({ data, onChange }) => {
  const { t } = useTranslation('leftSidebar');

  return (
    <div>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.objective.enable}
            onChange={v => onChange('data.objective.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.objective.heading}
            onChange={v => onChange('data.objective.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      <TextArea
        rows="15"
        className="mb-4"
        label={t('objective.objective.label')}
        value={data.objective.body}
        placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
        onChange={v => onChange('data.objective.body', v)}
      />
    </div>
  );
};

export default ObjectiveTab;
