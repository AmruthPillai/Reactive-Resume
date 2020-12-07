import React, { memo, useContext } from 'react';
import { get } from 'lodash';
import PageContext from '../../../contexts/PageContext';
import Icons from '../Icons';
import { formatDate } from '../../../utils';

const BirthDateC = () => {
  const { data } = useContext(PageContext);
  const Icon = get(Icons, 'birthdaycake');

  if (data.profile.birthDate) {
    return (
      <div className="text-xs flex items-center">
        <Icon
          size="10px"
          className="mr-2"
          style={{ color: data.metadata.colors.background }}
        />
        <span className="font-medium break-all">
          {formatDate({
            date: data.profile.birthDate,
            language: data.metadata.language,
            includeDay: true,
          })}
        </span>
      </div>
    );
  }

  return null;
};

export default memo(BirthDateC);
