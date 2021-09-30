import React, { memo, useContext } from 'react';
import Markdown from '../../../components/shared/Markdown';
import { safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    safetyCheck(data.objective, 'body') && (
      <div>
        <Heading>{data.objective.heading}</Heading>
        <Markdown className="markdown text-sm">{data.objective.body}</Markdown>
      </div>
    )
  );
};

export default memo(ObjectiveA);
