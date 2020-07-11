import React, { useContext, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange } from '../../../utils';

const WorkItem = (x) => (
  <div key={x.id} className="mb-4 last:mb-0">
    <div className="flex justify-between items-center">
      <div>
        <h6 className="font-semibold">{x.company}</h6>
        <span className="text-xs">{x.position}</span>
      </div>
      <span className="text-xs font-medium">
        ({formatDateRange({ startDate: x.startDate, endDate: x.endDate })})
      </span>
    </div>
    <ReactMarkdown className="mt-2 text-sm" source={x.summary} />
    {x.highlights && (
      <ul className="mt-2 text-sm list-disc list-inside">
        {x.highlights.map((y) => (
          <li key={y}>{y}</li>
        ))}
      </ul>
    )}
  </div>
);

const WorkA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.work.visible && data.work.items ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div>{data.work.items.map(WorkItem)}</div>
    </div>
  ) : null;
};

export default memo(WorkA);
