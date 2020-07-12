import moment from 'moment';
import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const CertificationItem = (x) => (
  <div key={x.id}>
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h6 className="font-semibold">{x.title}</h6>
        <span className="text-xs">{x.issuer}</span>
      </div>
      {x.date && (
        <h6 className="text-xs font-medium text-right">
          {moment(x.date).format('MMMM YYYY')}
        </h6>
      )}
    </div>
    {x.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={x.summary} />
    )}
  </div>
);

const CertificationsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.certifications) ? (
    <div>
      <Heading>{data.certifications.heading}</Heading>
      <div className="grid gap-4">
        {data.certifications.items.map(CertificationItem)}
      </div>
    </div>
  ) : null;
};

export default memo(CertificationsA);
