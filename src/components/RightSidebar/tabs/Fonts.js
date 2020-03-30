import React from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '../../../shared/TextField';

const fontOptions = [
  'Lato',
  'Montserrat',
  'Nunito',
  'Open Sans',
  'Raleway',
  'Rubik',
  'Source Sans Pro',
  'Titillium Web',
  'Ubuntu',
];

const FontsTab = ({ theme, onChange }) => {
  const { t } = useTranslation('rightSidebar');

  return (
    <div className="grid grid-cols-1 gap-6">
      {fontOptions.map(x => (
        <div
          key={x}
          style={{ fontFamily: x }}
          onClick={() => onChange('theme.font.family', x)}
          className={`w-full rounded border py-4 shadow text-xl text-center ${
            theme.font.family === x ? 'border-gray-500' : 'border-transparent'
          } hover:border-gray-400 cursor-pointer`}
        >
          {x}
        </div>
      ))}

      <div>
        <TextField
          className="mb-3"
          label={t('fonts.fontFamily.label')}
          placeholder="Avenir Next"
          value={theme.font.family}
          onChange={v => onChange('theme.font.family', v)}
        />

        <p className="text-gray-800 text-xs">{t('fonts.fontFamily.helpText')}</p>
      </div>
    </div>
  );
};

export default FontsTab;
