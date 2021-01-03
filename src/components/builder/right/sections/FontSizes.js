/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useState, useEffect } from 'react';
import fontSizeVarsDefault from '../../../../data/fontSizeVarsDefault';
import Heading from '../../../shared/Heading';

/* font size control */
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
  const [fontScale, setFontScale] = useState(scaleDefault);

  // translate a linearly scaled value from the slider into a scale factor
  const scale = (value) => logStepSize ** (value - min) * logMin;

  useEffect(() => {
    /* loop through the css variables we need to set and set them to the default
       for that variable multiplied by the scale factor */
    for (const [key, sizeDefault] of Object.entries(fontSizeVarsDefault)) {
      document.documentElement.style.setProperty(
        key,
        `${scale(fontScale) * sizeDefault}rem`,
      );
    }
  }, [fontScale]);

  const onChange = (event) => setFontScale(event.target.value);

  return (
    <section>
      <Heading id={id} />

      <input
        type="range"
        onChange={onChange}
        min={min}
        max={max}
        step={1}
        defaultValue={scaleDefault}
      />
    </section>
  );
};

export default memo(FontSizes);
