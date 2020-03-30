import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import TextField from '../../../shared/TextField';
import { copyToClipboard } from '../../../utils';

const colorOptions = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#FAFAFA',
  '#212121',
  '#263238',
];

const ColorsTab = ({ theme, onChange }) => {
  const { t } = useTranslation('rightSidebar');

  const copyColorToClipboard = color => {
    copyToClipboard(color);
    toast(t('colors.clipboardCopyAction', { color }), {
      bodyClassName: 'text-center text-gray-800 py-2',
    });
    onChange('theme.colors.accent', color);
  };

  return (
    <div>
      <div className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-4">
        {t('colors.colorOptions')}
      </div>
      <div className="mb-6 grid grid-cols-8 col-gap-2 row-gap-3">
        {colorOptions.map(color => (
          <div
            key={color}
            className="cursor-pointer rounded-full border border-gray-200 h-6 w-6 hover:opacity-75"
            style={{ backgroundColor: color }}
            onClick={() => copyColorToClipboard(color)}
          />
        ))}
      </div>

      <hr className="my-6" />

      <div className="my-6 grid grid-cols-6 items-end">
        <div
          className="rounded-full w-8 h-8 mb-2 border-2"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div className="col-span-5">
          <TextField
            label={t('colors.primaryColor')}
            placeholder="#FFFFFF"
            value={theme.colors.primary}
            onChange={v => onChange('theme.colors.primary', v)}
          />
        </div>
      </div>

      <div className="my-6 grid grid-cols-6 items-end">
        <div
          className="rounded-full w-8 h-8 mb-2 border-2"
          style={{ backgroundColor: theme.colors.accent }}
        />
        <div className="col-span-5">
          <TextField
            label={t('colors.accentColor')}
            placeholder="#FFFFFF"
            value={theme.colors.accent}
            onChange={v => onChange('theme.colors.accent', v)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorsTab;
