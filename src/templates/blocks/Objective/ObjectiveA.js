import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    safetyCheck(data.objective, 'body') && (
      <div>
        <Heading>{data.objective.heading}</Heading>
        <ReactMarkdown className="markdown text-sm">
          {data.objective.body}
        </ReactMarkdown>
      </div>
    )
  );
};

export default memo(ObjectiveA);
