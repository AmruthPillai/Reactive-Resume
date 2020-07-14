import React, { memo } from 'react';
import { FaCoffee, FaBug } from 'react-icons/fa';
import { MdCode } from 'react-icons/md';
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

      <div className={styles.container}>
        <h5>Bug? Feature Request?</h5>

        <p className="leading-loose">
          Something halting your progress from making a resume? Found a pesky
          bug that just won&apos;t quit? Talk about it on the GitHub Issues
          section, or send me and email using the actions below.
        </p>

        <div className="mt-4 flex">
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume/issues/new"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={FaBug}>Raise an Issue</Button>
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <h5>Source Code</h5>

        <p className="leading-loose">
          Want to run the project from its source? Are you a developer willing
          to contribute to the open-source development of this project? Click
          the button below.
        </p>

        <div className="mt-4 flex">
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={MdCode}>GitHub Repo</Button>
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <h5>License Information</h5>

        <p className="leading-loose">
          The project is governed under the MIT License, which you can read more
          about below. Basically, you are allowed to use the project anywhere
          provided you give credits to the original author.
        </p>

        <div className="mt-4 flex">
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume/blob/master/LICENSE"
            rel="noreferrer"
            target="_blank"
          >
            <Button icon={MdCode}>MIT License</Button>
          </a>
        </div>
      </div>

      <div className="my-4 text-center opacity-50 text-sm">
        <p>
          Made with Love by{' '}
          <a href="https://amruthpillai.com" rel="noreferrer" target="_blank">
            Amruth Pillai
          </a>
        </p>
      </div>
    </section>
  );
};

export default memo(About);
