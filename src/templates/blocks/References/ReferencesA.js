import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { isItemVisible, safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const ReferenceItem = ({ id, name, position, phone, email, summary }) => (
  <div key={id} className="flex flex-col">
    <h6 className="font-semibold text-sm">{name}</h6>
    <span className="text-xs">{position}</span>
    <span className="text-xs">{phone}</span>
    <span className="text-xs">{email}</span>
    {summary && (
      <ReactMarkdown className="markdown mt-2 text-sm">{summary}</ReactMarkdown>
    )}
  </div>
);

const ReferencesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.references) ? (
    <div>
      <Heading>{data.references.heading}</Heading>
      <div className="grid grid-cols-3 gap-4">
        {data.references.items.map((x) => isItemVisible(x) && ReferenceItem(x))}
      </div>
    </div>
  ) : null;
};

export default memo(ReferencesA);
