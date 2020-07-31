import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';

const EducationItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold">{item.institution}</h6>
        <span className="text-xs">
          <strong>{item.degree}</strong> {item.field}
        </span>
      </div>
      <div className="flex flex-col items-end text-right">
        {item.startDate && (
          <h6 className="text-xs font-medium mb-1">
            (
            {formatDateRange({
              startDate: item.startDate,
              endDate: item.endDate,
              language,
            })}
            )
          </h6>
        )}
        <span className="text-sm font-medium">{item.gpa}</span>
      </div>
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
    )}
  </div>
);

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.education) ? (
    <div>
      <Heading>{data.education.heading}</Heading>
      <div className="grid gap-4">
        {data.education.items.map((x) => (
          <EducationItem
            key={x.id}
            item={x}
            language={data.metadata.language}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(EducationA);
