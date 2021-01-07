/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import fontSizeOptions from '../../../../data/fontSizeOptions';
import { scaler } from '../../../../utils';
import Heading from '../../../shared/Heading';

const FontSizes = ({ id }) => {
  const steps = 20;
  const min = 0;
  const max = min + steps - 1;

  const dispatch = useDispatch();
  const fontSize = useSelector('metadata.fontSize');
  const [scale, setScale] = useState(fontSize || 7);

  useEffect(() => {
    for (const [key, sizeDefault] of Object.entries(fontSizeOptions)) {
      document.documentElement.style.setProperty(
        key,
        `${scaler(scale) * sizeDefault}rem`,
      );
    }
  }, [scale]);

  const onChange = (event) => {
    const { value } = event.target;

    setScale(value);

    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.fontSize',
        value,
      },
    });
  };

  return (
    <section>
      <Heading id={id} />

      <input
        step={1}
        min={min}
        max={max}
        type="range"
        onChange={onChange}
        defaultValue={scale}
        className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-4 w-full"
      />
    </section>
  );
};

export default memo(FontSizes);
