import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const LanguageItem = (x) => (
  <div key={x.id} className="mb-2">
    <h6 className="font-semibold">{x.name}</h6>
    <p className="text-xs">{x.fluency}</p>
  </div>
);

const LanguagesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.languages.visible && data.languages.items ? (
    <div>
      <Heading>{data.languages.heading}</Heading>
      {data.languages.items.map(LanguageItem)}
    </div>
  ) : null;
};

export default memo(LanguagesA);
