import { clone } from 'lodash';
import React, { memo, useContext, useState } from 'react';
import { MdImportExport } from 'react-icons/md';
import ModalContext from '../../../../contexts/ModalContext';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import UserContext from '../../../../contexts/UserContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import styles from './Actions.module.css';

const Actions = () => {
  const [loadDemoText, setLoadDemoText] = useState('Load Demo Data');
  const [resetText, setResetText] = useState('Reset Everything');
  const [deleteText, setDeleteText] = useState('Delete Account');

  const state = useSelector();
  const dispatch = useDispatch();
  const { emitter, events } = useContext(ModalContext);
  const { deleteAccount } = useContext(UserContext);

  const handleImport = () => emitter.emit(events.IMPORT_MODAL);

  const handleExportToJson = () => {
    const backupObj = clone(state);
    delete backupObj.id;
    delete backupObj.user;
    delete backupObj.name;
    delete backupObj.createdAt;
    delete backupObj.updatedAt;
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupObj),
    )}`;
    const dlAnchor = document.getElementById('downloadAnchor');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute(
      'download',
      `RxResume_${state.id}_${Date.now()}.json`,
    );
    dlAnchor.click();
  };

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

  const handleDeleteAccount = () => {
    if (deleteText === 'Delete Account') {
      setDeleteText('Are you sure?');
      return;
    }

    setDeleteText('Buh bye! :(');
    setTimeout(() => {
      deleteAccount();
    }, 500);
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
          <Button icon={MdImportExport} onClick={handleImport}>
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
          <Button>Save as PDF</Button>
          <Button outline className="ml-6" onClick={handleExportToJson}>
            Export as JSON
          </Button>
        </div>

        <a id="downloadAnchor" className="hidden">
          Download Exported JSON
        </a>
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

      <div className={styles.container}>
        <h5>Danger Zone</h5>

        <p className="leading-loose">
          If you would like to delete your account and erase all your resumes,
          it’s just one button away. Please be weary as this is an irreversible
          process.
        </p>

        <div className="mt-4 flex">
          <Button isDelete onClick={handleDeleteAccount}>
            {deleteText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Actions);
