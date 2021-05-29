import React, { memo } from 'react';
import cx from 'classnames';
import * as styles from './Fonts.module.css';
import { handleKeyUp } from '../../../../utils';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import Heading from '../../../shared/Heading';
import fontOptions from '../../../../data/fontOptions';

const Fonts = ({ id }) => {
  const dispatch = useDispatch();
  const font = useSelector('metadata.font');

  const handleClick = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.font',
        value,
      },
    });
  };

  return (
    <section>
      <Heading id={id} />

      <div className="grid grid-cols-2 gap-8">
        {fontOptions.map((x) => (
          <div
            key={x}
            tabIndex="0"
            role="button"
            style={{ fontFamily: x }}
            className={cx(styles.font, { [styles.selected]: font === x })}
            onKeyUp={(e) => handleKeyUp(e, () => handleClick(x))}
            onClick={() => handleClick(x)}
          >
            {x}
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Fonts);
