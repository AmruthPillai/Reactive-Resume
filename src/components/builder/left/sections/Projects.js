import React, { memo } from 'react';
import Heading from '../../../shared/Heading';
import List from '../../lists/List';

const Projects = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="title"
        subtitlePath="link"
        textPath="summary"
      />
    </section>
  );
};

export default memo(Projects);
