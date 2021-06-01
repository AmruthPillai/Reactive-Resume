import React, { memo, useContext } from 'react';
import { isItemVisible, safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const LanguageItem = ({ id, name, fluency }) => (
  <div key={id} className="flex flex-col">
    <h6 className="font-semibold text-sm">{name}</h6>
    <span className="text-xs">{fluency}</span>
  </div>
);

const LanguagesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.languages) ? (
    <div>
      <Heading>{data.languages.heading}</Heading>
      <div className="grid gap-2">
        {data.languages.items.map((x) => isItemVisible(x) && LanguageItem(x))}
      </div>
    </div>
  ) : null;
};

export default memo(LanguagesB);
