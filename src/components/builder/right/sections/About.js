import React, { memo } from 'react';
import { FaCoffee, FaBug, FaExternalLinkAlt } from 'react-icons/fa';
import { MdCode } from 'react-icons/md';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './About.module.css';

const About = ({ name }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading>{name}</Heading>

      <div className={styles.container}>
        <h5>{t('builder.about.donate.heading')}</h5>

        <p className="leading-loose">
          <Trans t={t} i18nKey="builder.about.donate.text">
            A<span className="font-bold">B</span>C
          </Trans>
        </p>

        <div className="mt-4 flex">
          <a
            href="https://www.buymeacoffee.com/AmruthPillai"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={FaCoffee}>{t('builder.about.donate.button')}</Button>
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <h5>{t('builder.about.bugFeature.heading')}</h5>

        <p className="leading-loose">{t('builder.about.bugFeature.text')}</p>

        <div className="mt-4 flex">
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume/issues/new"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={FaBug}>{t('builder.about.bugFeature.button')}</Button>
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <h5>{t('builder.about.appreciate.heading')}</h5>

        <p className="leading-loose">{t('builder.about.appreciate.text')}</p>

        <div className="mt-4 flex">
          <a href="https://amruthpillai.com" rel="noreferrer" target="_blank">
            <Button icon={FaExternalLinkAlt}>amruthpillai.com</Button>
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <h5>{t('builder.about.sourceCode.heading')}</h5>

        <p className="leading-loose">{t('builder.about.sourceCode.text')}</p>

        <div className="mt-4 flex">
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={MdCode}>
              {t('builder.about.sourceCode.button')}
            </Button>
          </a>
        </div>
      </div>

      <div className="my-4 text-center opacity-50 text-sm">
        <Trans t={t} i18nKey="builder.about.footer">
          A
          <a href="https://amruthpillai.com" rel="noreferrer" target="_blank">
            B
          </a>
        </Trans>
      </div>
    </section>
  );
};

export default memo(About);
