import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const LanguageItem = (x) => (
  <div key={x.id} className="flex flex-col">
    <h6 className="font-semibold text-sm">{x.name}</h6>
    <span className="text-xs">{x.fluency}</span>
  </div>
);

const LanguagesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.languages) ? (
    <div>
      <Heading>{data.languages.heading}</Heading>
      <div className="grid grid-cols-2 gap-2">
        {data.languages.items.map(LanguageItem)}
      </div>
    </div>
  ) : null;
};

export default memo(LanguagesA);
