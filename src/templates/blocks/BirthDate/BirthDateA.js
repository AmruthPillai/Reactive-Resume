import { useTranslation } from 'react-i18next';
import React, { memo, useContext } from 'react';
import { formatDate } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const BirthDateA = () => {
  const { t } = useTranslation();
  const { data } = useContext(PageContext);

  if (data.profile.birthDate) {
    return (
      <div className="text-xs">
        <h6 className="capitalize font-semibold">
          {t('builder.profile.birthDate')}
        </h6>
        <div>
          <span>
            {formatDate({
              date: data.profile.birthDate,
              language: data.metadata.language,
              includeDay: true,
            })}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateA);
