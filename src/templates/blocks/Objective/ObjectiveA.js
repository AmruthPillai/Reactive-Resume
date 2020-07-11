import React, { useContext, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    <div>
      <Heading>{data.objective.heading}</Heading>
      <ReactMarkdown className="text-sm" source={data.objective.body} />
    </div>
  );
};

export default memo(ObjectiveA);
