import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { id, name, metadata } = state;
  const { template } = metadata;

  return (
    <>
      <Helmet>
        <title>
          {name} | {t('shared.appName')}
        </title>
        <link
          rel="canonical"
          href={`https://rxresume-staging.web.app/app/builder/${id}`}
        />
      </Helmet>

      <div className={styles.container}>
        {template === 'onyx' && <Onyx data={state} />}
        {template === 'pikachu' && <Pikachu data={state} />}
        {template === 'gengar' && <Gengar data={state} />}
        {template === 'castform' && <Castform data={state} />}
        {template === 'glalie' && <Glalie data={state} />}
        {template === 'celebi' && <Celebi data={state} />}
      </div>
    </>
  );
};

export default memo(Artboard);
