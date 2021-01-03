/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import fontSizeOptions from '../../../../data/fontSizeOptions';
import Heading from '../../../shared/Heading';

const FontSizes = ({ id }) => {
  // precompute some stuff for the logarithmic slider
  const logMax = 2.5;
  const logDefault = 1;
  const logMin = 0.6;
  const steps = 20;
  const logRange = logMax / logMin;
  const logStepSize = logRange ** (1 / steps);
  const min = 0;
  const max = min + steps - 1;
  const scaleDefault = Math.log(logDefault / logMin) / Math.log(logStepSize);

  const dispatch = useDispatch();
  const fontSize = useSelector('metadata.fontSize');
  const [fontScale, setFontScale] = useState(fontSize || scaleDefault);

  // translate a linearly scaled value from the slider into a scale factor
  const scale = (value) => logStepSize ** (value - min) * logMin;

  useEffect(() => {
    /* loop through the css variables we need to set and set them to the default
       for that variable multiplied by the scale factor */
    for (const [key, sizeDefault] of Object.entries(fontSizeOptions)) {
      document.documentElement.style.setProperty(
        key,
        `${scale(fontScale) * sizeDefault}rem`,
      );
    }
  }, [fontScale]);

  const onChange = (event) => {
    const { value } = event.target;

    setFontScale(value);

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
        defaultValue={fontScale}
        className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-4 w-full"
      />
    </section>
  );
};

export default memo(FontSizes);
