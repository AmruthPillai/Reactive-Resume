import React, { memo, useContext } from 'react';
import Markdown from '../../../components/shared/Markdown';
import { formatDate, isItemVisible, safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const CertificationItem = ({ item, language }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h6 className="font-semibold text-sm">{item.title}</h6>
          </a>
        ) : (
          <h6 className="font-semibold text-sm">{item.title}</h6>
        )}
        <span className="text-xs">{item.issuer}</span>
      </div>
      {item.date && (
        <h6 className="text-xs font-medium text-right">
          {formatDate({ date: item.date, language })}
        </h6>
      )}
    </div>
    {item.summary && (
      <Markdown className="markdown mt-2 text-sm">{item.summary}</Markdown>
    )}
  </div>
);

const CertificationsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.certifications) ? (
    <div>
      <Heading>{data.certifications.heading}</Heading>
      <div className="grid gap-4">
        {data.certifications.items.map(
          (x) =>
            isItemVisible(x) && (
              <CertificationItem
                key={x.id}
                item={x}
                language={data.metadata.language}
              />
            ),
        )}
      </div>
    </div>
  ) : null;
};

export default memo(CertificationsA);
