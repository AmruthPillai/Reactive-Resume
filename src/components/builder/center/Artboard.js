import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from '../../../contexts/ResumeContext';
import Castform from '../../../templates/Castform';
import Celebi from '../../../templates/Celebi';
import Gengar from '../../../templates/Gengar';
import Glalie from '../../../templates/Glalie';
import Onyx from '../../../templates/Onyx';
import Pikachu from '../../../templates/Pikachu';
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
        {template === 'pikachu' && <Pikachu data={state} />}
        {template === 'gengar' && <Gengar data={state} />}
        {template === 'castform' && <Castform data={state} />}
        {template === 'glalie' && <Glalie data={state} />}
        {template === 'celebi' && <Celebi data={state} />}
      </div>
    </div>
  );
};

export default memo(Artboard);
