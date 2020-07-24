import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';

const WorkItem = ({ item, i18n }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold">{item.company}</h6>
        <span className="text-xs">{item.position}</span>
      </div>
      {item.startDate && (
        <h6 className="text-xs font-medium text-right">
          (
          {formatDateRange({
            startDate: item.startDate,
            endDate: item.endDate,
            language: i18n.language,
          })}
          )
        </h6>
      )}
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
    )}
  </div>
);

const WorkA = () => {
  const { i18n } = useTranslation();
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.work) ? (
    <div>
      <Heading>{data.work.heading}</Heading>
      <div className="grid gap-4">
        {data.work.items.map((x) => (
          <WorkItem key={x.id} item={x} i18n={i18n} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(WorkA);
