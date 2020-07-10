import React, { memo, useContext } from 'react';
import { MdImportExport } from 'react-icons/md';
import { clone } from 'lodash';
import Heading from '../../../shared/Heading';
import Button from '../../../shared/Button';
import styles from './Actions.module.css';
import Input from '../../../shared/Input';
import ModalContext from '../../../../contexts/ModalContext';
import { useSelector } from '../../../../contexts/ResumeContext';

const Actions = () => {
  const state = useSelector();
  const { emitter, events } = useContext(ModalContext);

  const handleImport = () => emitter.emit(events.IMPORT_MODAL);

  const handleExportToJson = () => {
    const backupObj = clone(state);
    delete backupObj.id;
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupObj),
    )}`;
    const dlAnchor = document.getElementById('downloadAnchor');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `RxResume_${state.id}.json`);
    dlAnchor.click();
  };

  const getSharableUrl = () => {
    const shareId = state.id.split('-')[0];
    return `https://rxresu.me/r/${shareId}`;
  };

  return (
    <section>
      <Heading>Actions</Heading>

      <div className={styles.container}>
        <h5>Import Your Resume</h5>

        <p>
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

        <p>
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

        <p>
          The link below will be accessible publicly if you choose to share it,
          and viewers would see the latest version of your resume at any time.
        </p>

        <div>
          <Input type="action" value={getSharableUrl()} onClick={() => {}} />
        </div>
      </div>

      <div className={styles.container}>
        <h5>Load Demo Data</h5>

        <p>
          Unclear on what to do with a fresh blank page? Load some demo data to
          see how a resume should look and you can start editing from there.
        </p>

        <div className="mt-4 flex">
          <Button>Load Demo Data</Button>
        </div>
      </div>

      <div className={styles.container}>
        <h5>Delete Account</h5>

        <p>
          If you would like to delete your account and erase all your resumes,
          it’s just one button away. Please be weary as this is an irreversible
          process.
        </p>

        <div className="mt-4 flex">
          <Button isDelete>Delete Account</Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Actions);
