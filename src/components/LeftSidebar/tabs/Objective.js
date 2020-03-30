import React from 'react';
import { useTranslation } from 'react-i18next';

import TextArea from '../../../shared/TextArea';
import TextField from '../../../shared/TextField';
import Checkbox from '../../../shared/Checkbox';

const ObjectiveTab = ({ data, onChange }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);

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
            placeholder={t('app:heading.placeholder')}
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
        placeholder={t('objective.objective.placeholder')}
        value={data.objective.body}
        onChange={v => onChange('data.objective.body', v)}
      />
    </div>
  );
};

export default ObjectiveTab;
