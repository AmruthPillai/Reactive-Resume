import cx from 'classnames';
import React, { memo } from 'react';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import templateOptions from '../../../../data/templateOptions';
import { handleKeyUp } from '../../../../utils';
import Heading from '../../../shared/Heading';
import styles from './Templates.module.css';

const Templates = () => {
  const dispatch = useDispatch();
  const template = useSelector('metadata.template');

  const handleClick = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.template',
        value,
      },
    });
  };

  return (
    <section>
      <Heading>Templates</Heading>

      <div className="grid grid-cols-2 gap-8">
        {templateOptions.map((x) => (
          <div
            key={x.id}
            tabIndex="0"
            role="button"
            onKeyUp={(e) => handleKeyUp(e, () => handleClick(x.id))}
            onClick={() => handleClick(x.id)}
            className={cx(styles.template, {
              [styles.selected]: template === x.id,
            })}
          >
            <img loading="lazy" height="240px" src={x.preview} alt={x.name} />
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Templates);
