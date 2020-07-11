import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange } from '../../../utils';

const EducationItem = (x) => (
  <div key={x.id} className="mb-2">
    <div className="flex justify-between items-center">
      <div>
        <h6 className="font-semibold">{x.institution}</h6>
        <span className="text-xs">
          <strong>{x.degree}</strong> {x.field}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-medium">
          ({formatDateRange({ startDate: x.startDate, endDate: x.endDate })})
        </span>
        <h6 className="text-sm font-medium">{x.gpa}</h6>
      </div>
    </div>
    {x.courses && (
      <ul className="mt-2 text-sm list-disc list-inside">
        {x.courses.map((y) => (
          <li key={y}>{y}</li>
        ))}
      </ul>
    )}
  </div>
);

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.education.visible && data.education.items ? (
    <div>
      <Heading>{data.education.heading}</Heading>
      {data.education.items.map(EducationItem)}
    </div>
  ) : null;
};

export default memo(EducationA);
