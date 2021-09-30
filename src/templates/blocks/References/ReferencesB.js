import React, { memo, useContext } from 'react';
import Markdown from '../../../components/shared/Markdown';
import { isItemVisible, safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const ReferenceItem = ({ id, name, position, phone, email, summary }) => (
  <div key={id} className="flex flex-col">
    <h6 className="font-semibold text-sm">{name}</h6>
    <span className="text-xs">{position}</span>
    <span className="text-xs">{phone}</span>
    <span className="text-xs">{email}</span>
    {summary && (
      <Markdown className="markdown mt-2 text-sm">{summary}</Markdown>
    )}
  </div>
);

const ReferencesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.references) ? (
    <div>
      <Heading>{data.references.heading}</Heading>
      <div className="grid gap-4">
        {data.references.items.map((x) => isItemVisible(x) && ReferenceItem(x))}
      </div>
    </div>
  ) : null;
};

export default memo(ReferencesB);
