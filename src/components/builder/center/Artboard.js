import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector as useMetadataSelector } from '../../../contexts/MetadataContext';
import { useSelector as useResumeSelector } from '../../../contexts/ResumeContext';
import Onyx from '../../../templates/Onyx';
import styles from './Artboard.module.css';

const Artboard = () => {
  const { template, layout, colors } = useMetadataSelector((store) => store);
  const state = useResumeSelector((store) => store);
  const { id, name } = state;

  return (
    <div>
      <Helmet>
        <title>{name} | Reactive Resume</title>
        <link rel="canonical" href={`https://rxresu.me/app/builder/${id}`} />
      </Helmet>

      <div id="artboard" className={styles.container}>
        {template === 'Onyx' && (
          <Onyx data={state} layout={layout} colors={colors} />
        )}
      </div>
    </div>
  );
};

export default memo(Artboard);
