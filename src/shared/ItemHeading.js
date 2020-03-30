import React from 'react';
import { useTranslation } from 'react-i18next';

const ItemHeading = ({ title, heading, isOpen, setOpen }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setOpen(!isOpen)}
    >
      <h6 className="text-sm font-medium">
        {typeof heading === 'undefined' ? title : t('item.add', { heading })}
      </h6>
      <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
    </div>
  );
};

export default ItemHeading;
