import React, { memo } from 'react';
import Heading from '../../shared/Heading';
import Input from '../../shared/Input';

const Objective = () => {
  return (
    <section>
      <Heading>Objective</Heading>

      <Input type="textarea" label="Objective" path="objective" />
    </section>
  );
};

export default memo(Objective);
