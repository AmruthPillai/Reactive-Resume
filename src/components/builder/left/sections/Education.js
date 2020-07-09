import React, { memo } from 'react';
import Heading from '../../../shared/Heading';
import List from '../../lists/List';

const Education = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List
        hasDate
        path={path}
        event={event}
        titlePath="institution"
        textPath="field"
      />
    </section>
  );
};

export default memo(Education);
