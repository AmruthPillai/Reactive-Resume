import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';

const EmptyList = () => {
  const { t } = useTranslation();

  return (
    <div className="py-6 opacity-75 text-center">{t('builder.emptyList')}</div>
  );
};

export default memo(EmptyList);
