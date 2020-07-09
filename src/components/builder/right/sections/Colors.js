import React, { memo } from 'react';
import { useDispatch } from '../../../../contexts/ResumeContext';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';

const Colors = () => {
  const dispatch = useDispatch();

  const handleClick = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.colors.primary',
        value,
      },
    });
  };

  return (
    <section>
      <Heading>Colors</Heading>

      <Input
        name="primary"
        label="Primary Color"
        placeholder="#FF4081"
        path="metadata.colors.primary"
      />

      <Input
        name="text"
        label="Text Color"
        placeholder="#444444"
        path="metadata.colors.text"
      />

      <Input
        name="background"
        label="Background Color"
        placeholder="#FFFFFF"
        path="metadata.colors.background"
      />
    </section>
  );
};

export default memo(Colors);
