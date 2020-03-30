import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { languages } from '../../../i18n';
import Dropdown from '../../../shared/Dropdown';

const SettingsTab = ({ settings, onChange }) => {
  const { t } = useTranslation('rightSidebar');

  return (
    <div>
      <Dropdown
        label={t('settings.language.label')}
        value={settings.language}
        onChange={x => onChange('settings.language', x)}
        options={languages}
        optionItem={x => (
          <option key={x.code} value={x.code}>
            {x.name}
          </option>
        )}
      />

      <p className="text-gray-800 text-xs">
        <Trans t={t} i18nKey="settings.language.helpText">
          If you would like to help translate the app into your own language, please refer the
          <a
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.rxresu.me/translation/"
          >
            Translation Documentation
          </a>
          .
        </Trans>
      </p>
    </div>
  );
};

export default SettingsTab;
