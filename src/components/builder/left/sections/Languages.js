import React, { memo } from 'react';
import Heading from '../../../shared/Heading';
import List from '../../lists/List';

const Languages = ({ id, name, event }) => {
  const path = `${id}.items`;

  return (
    <section>
      <Heading>{name}</Heading>

      <List path={path} event={event} titlePath="name" subtitlePath="fluency" />
    </section>
  );
};

export default memo(Languages);
