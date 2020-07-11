import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';

const WorkItem = (x) => (
  <div key={x.id}>
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h6 className="font-semibold">{x.company}</h6>
        <span className="text-xs">{x.position}</span>
      </div>
      {x.startDate && (
        <h6 className="text-xs font-medium">
          ({formatDateRange({ startDate: x.startDate, endDate: x.endDate })})
        </h6>
      )}
    </div>
    <ReactMarkdown className="markdown mt-2 text-sm" source={x.summary} />
  </div>
);

const WorkA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.work) ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div className="grid gap-4">{data.work.items.map(WorkItem)}</div>
    </div>
  ) : null;
};

export default memo(WorkA);
