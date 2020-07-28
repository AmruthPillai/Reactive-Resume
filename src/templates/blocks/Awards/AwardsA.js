import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDate, safetyCheck } from '../../../utils';

const AwardItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold">{item.title}</h6>
        <span className="text-xs">{item.awarder}</span>
      </div>
      {item.date && (
        <h6 className="text-xs font-medium text-right">
          {formatDate({ date: item.date, language })}
        </h6>
      )}
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
    )}
  </div>
);

const AwardsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.awards) ? (
    <div>
      <Heading>{data.awards.heading}</Heading>
      <div className="grid gap-4">
        {data.awards.items.map((x) => (
          <AwardItem key={x.id} item={x} language={data.metadata.language} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(AwardsA);
