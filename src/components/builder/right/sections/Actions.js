import React, { memo } from 'react';
import { MdImportExport } from 'react-icons/md';
import Heading from '../../../shared/Heading';
import Button from '../../../shared/Button';
import styles from './Actions.module.css';
import Input from '../../../shared/Input';

const Actions = () => {
  return (
    <section>
      <Heading>Actions</Heading>

      <div className={styles.container}>
        <h5>Import from Other Sources</h5>

        <p>
          You can import your information from various sources like JSON Resume
          or your LinkedIn profile to autofill most of the data for your resume.
        </p>

        <div className="mt-4 flex">
          <Button icon={MdImportExport} title="Import" />
        </div>
      </div>

      <div className={styles.container}>
        <h5>Export Your Resume</h5>

        <p>
          Export your resume as a PDF to share with recruiters or a JSON that
          you will be able to import back onto this app on another computer.
        </p>

        <div className="mt-4 flex">
          <Button title="Save as PDF" />
          <Button outline title="Export as JSON" className="ml-6" />
        </div>
      </div>

      <div className={styles.container}>
        <h5>Share Your Resume</h5>

        <p>
          The link below will be accessible publicly if you choose, and you can
          share the latest version of your resume to anyone in the world.
        </p>

        <div>
          <Input type="action" value="https://google.com" onClick={() => {}} />
        </div>
      </div>

      <div className={styles.container}>
        <h5>Load Demo Data</h5>

        <p>
          Unclear on what to do with a fresh blank page? Load some demo data to
          see how a resume should look and you can start editing from there.
        </p>

        <div className="mt-4 flex">
          <Button title="Load Demo Data" />
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
          <Button title="Delete Account" />
        </div>
      </div>
    </section>
  );
};

export default memo(Actions);
