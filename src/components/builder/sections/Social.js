import React from 'react';
import Heading from '../../shared/Heading';
import List from '../lists/List';

const Social = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="network"
        subtitlePath="username"
      />
    </section>
  );
};

export default Social;
