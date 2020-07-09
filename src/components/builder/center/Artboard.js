import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from '../../../contexts/ResumeContext';
import Onyx from '../../../templates/Onyx';
import styles from './Artboard.module.css';

const Artboard = () => {
  const state = useSelector();
  const { id, name, metadata } = state;
  const { template } = metadata;

  return (
    <div>
      <Helmet>
        <title>{name} | Reactive Resume</title>
        <link rel="canonical" href={`https://rxresu.me/app/builder/${id}`} />
      </Helmet>

      <div id="artboard" className={styles.container}>
        {template === 'onyx' && <Onyx data={state} />}
      </div>
    </div>
  );
};

export default memo(Artboard);
