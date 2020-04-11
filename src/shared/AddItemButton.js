import React from 'react';
import { useTranslation } from 'react-i18next';

const AddItemButton = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <div>
      <button
        type="button"
        onClick={onSubmit}
        className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
      >
        <div className="flex items-center">
          <i className="material-icons mr-2 font-bold text-base">add</i>
          <span className="text-sm">{t('buttons.add.label')}</span>
        </div>
      </button>
    </div>
  );
};

export default AddItemButton;
