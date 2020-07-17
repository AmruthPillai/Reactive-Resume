import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    safetyCheck(data.objective, 'body') && (
      <div>
        <Heading>{data.objective.heading}</Heading>
        <ReactMarkdown
          className="markdown text-sm"
          source={data.objective.body}
        />
      </div>
    )
  );
};

export default memo(ObjectiveA);
