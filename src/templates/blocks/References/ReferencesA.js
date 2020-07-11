import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';

const ReferenceItem = (x) => (
  <div key={x.id} className="mb-2">
    <h6 className="font-semibold">{x.name}</h6>
    <p className="text-xs">{x.position}</p>
    <p className="text-xs">{x.phone}</p>
    <p className="text-xs">{x.email}</p>
    <ReactMarkdown className="mt-2 text-sm" source={x.summary} />
  </div>
);

const ReferencesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.references.visible && data.references.items ? (
    <div>
      <Heading>{data.references.heading}</Heading>
      <div className="grid grid-cols-3 col-gap-8">
        {data.references.items.map(ReferenceItem)}
      </div>
    </div>
  ) : null;
};

export default memo(ReferencesA);
