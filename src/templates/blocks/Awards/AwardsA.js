import moment from 'moment';
import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';

const AwardItem = (x) => (
  <div key={x.id} className="mb-2">
    <div className="flex justify-between items-center">
      <div>
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs">{x.awarder}</p>
      </div>

      <h6 className="text-xs font-medium">
        {moment(x.date).format('MMMM YYYY')}
      </h6>
    </div>
    <ReactMarkdown className="mt-2 text-sm" source={x.summary} />
  </div>
);

const AwardsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.awards.visible && data.awards.items ? (
    <div>
      <Heading>{data.awards.heading}</Heading>
      {data.awards.items.map(AwardItem)}
    </div>
  ) : null;
};

export default memo(AwardsA);
