import React, { memo, useContext, useState } from 'react';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import ModalContext from '../../../../contexts/ModalContext';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import styles from './Actions.module.css';

const Actions = () => {
  const [loadDemoText, setLoadDemoText] = useState('Load Demo Data');
  const [resetText, setResetText] = useState('Reset Everything');

  const state = useSelector();
  const dispatch = useDispatch();
  const { emitter, events } = useContext(ModalContext);

  const handleImport = () => emitter.emit(events.IMPORT_MODAL);

  const handleExport = () => emitter.emit(events.EXPORT_MODAL);

  const getSharableUrl = () => {
    const shareId = state.id;
    return `https://rxresu.me/r/${shareId}`;
  };

  const handleOpenLink = () => {
    if (typeof window !== `undefined`) {
      window && window.open(getSharableUrl());
    }
  };

  const handleLoadDemo = () => {
    if (loadDemoText === 'Load Demo Data') {
      setLoadDemoText('Are you sure?');
      return;
    }

    dispatch({ type: 'load_demo_data' });
    setLoadDemoText('Load Demo Data');
  };

  const handleReset = () => {
    if (resetText === 'Reset Everything') {
      setResetText('Are you sure?');
      return;
    }

    setResetText('Reset Everything');
    dispatch({ type: 'reset_data' });
  };

  return (
    <section>
      <Heading>Actions</Heading>

      <div className={styles.container}>
        <h5>Import Your Resume</h5>

        <p className="leading-loose">
          You can import your information from various sources like JSON Resume
          or your LinkedIn to autofill most of the data for your resume.
        </p>

        <div className="mt-4 flex">
          <Button icon={FaFileImport} onClick={handleImport}>
            Import
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <h5>Export Your Resume</h5>

        <p className="leading-loose">
          Export your resume as a PDF to share with recruiters or a JSON that
          you will be able to import back onto this app on another computer.
        </p>

        <div className="mt-4 flex">
          <Button icon={FaFileExport} onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <h5>Share Your Resume</h5>

        <p className="leading-loose">
          The link below will be accessible publicly if you choose to share it,
          and viewers would see the latest version of your resume at any time.
        </p>

        <div>
          <Input
            type="action"
            value={getSharableUrl()}
            onClick={handleOpenLink}
          />
        </div>
      </div>

      <div className={styles.container}>
        <h5>Load Demo Data</h5>

        <p className="leading-loose">
          Unclear on what to do with a fresh blank page? Load some demo data to
          see how a resume should look and you can start editing from there.
        </p>

        <div className="mt-4 flex">
          <Button onClick={handleLoadDemo}>{loadDemoText}</Button>
        </div>
      </div>

      <div className={styles.container}>
        <h5>Reset Everything</h5>

        <p className="leading-loose">
          Feels like you made too many mistakes? No worries, clear everything
          with just one click, but be careful if there are no backups.
        </p>

        <div className="mt-4 flex">
          <Button onClick={handleReset}>{resetText}</Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Actions);
