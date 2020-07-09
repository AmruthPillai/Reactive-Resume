import React, { memo } from 'react';
import Heading from '../../shared/Heading';
import List from '../lists/List';

const Awards = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="title"
        subtitlePath="awarder"
        textPath="summary"
      />
    </section>
  );
};

export default memo(Awards);
