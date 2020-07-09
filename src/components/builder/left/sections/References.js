import React, { memo } from 'react';
import Heading from '../../../shared/Heading';
import List from '../../lists/List';

const References = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        path={path}
        event={event}
        titlePath="name"
        subtitlePath="position"
        textPath="summary"
      />
    </section>
  );
};

export default memo(References);
