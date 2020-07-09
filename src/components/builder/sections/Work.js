import React from 'react';
import Heading from '../../shared/Heading';
import List from '../lists/List';

const Work = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        hasDate
        path={path}
        event={event}
        titlePath="company"
        textPath="summary"
      />
    </section>
  );
};

export default Work;
