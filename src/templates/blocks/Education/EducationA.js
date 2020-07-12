import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';

const EducationItem = (x) => (
  <div key={x.id}>
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h6 className="font-semibold">{x.institution}</h6>
        <span className="text-xs">
          <strong>{x.degree}</strong> {x.field}
        </span>
      </div>
      <div className="flex flex-col items-end text-right">
        {x.startDate && (
          <h6 className="text-xs font-medium mb-1">
            ({formatDateRange({ startDate: x.startDate, endDate: x.endDate })})
          </h6>
        )}
        <span className="text-sm font-medium">{x.gpa}</span>
      </div>
    </div>
    {x.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={x.summary} />
    )}
  </div>
);

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.education) ? (
    <div>
      <Heading>{data.education.heading}</Heading>
      <div className="grid gap-4">
        {data.education.items.map(EducationItem)}
      </div>
    </div>
  ) : null;
};

export default memo(EducationA);
