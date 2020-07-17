import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const ReferenceItem = (x) => (
  <div key={x.id} className="flex flex-col">
    <h6 className="font-semibold">{x.name}</h6>
    <span className="text-xs">{x.position}</span>
    <span className="text-xs">{x.phone}</span>
    <span className="text-xs">{x.email}</span>
    {x.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={x.summary} />
    )}
  </div>
);

const ReferencesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.references) ? (
    <div>
      <Heading>{data.references.heading}</Heading>
      <div className="grid gap-4">
        {data.references.items.map(ReferenceItem)}
      </div>
    </div>
  ) : null;
};

export default memo(ReferencesB);
