import React, { memo } from 'react';
import { FaCoffee } from 'react-icons/fa';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './About.module.css';

const About = () => {
  return (
    <section>
      <Heading>About</Heading>

      <div className={styles.container}>
        <h5>Donate to Reactive Resume</h5>

        <p className="leading-loose">
          As you know, every nook and cranny of this app is free and
          open-source, but servers don&apos;t pay for themselves.
        </p>

        <p className="leading-loose">
          I try to do what I can, but if you found the app helpful, or
          you&apos;re in a better position than the others who depend on this
          project for their first job, please consider donating{' '}
          <span className="font-semibold">
            as little as $5 to help keep the project alive
          </span>{' '}
          :)
        </p>

        <div className="mt-4 flex">
          <a
            href="https://www.buymeacoffee.com/AmruthPillai"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={FaCoffee}>Buy me a coffee!</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
