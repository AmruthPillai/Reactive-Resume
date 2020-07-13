import { Tooltip } from '@material-ui/core';
import Ajv from 'ajv';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/shared/Button';
import ModalContext from '../../contexts/ModalContext';
import { useDispatch } from '../../contexts/ResumeContext';
import reactiveResumeSchema from '../../data/schema/reactiveResume.json';
import BaseModal from '../BaseModal';

const ImportModal = () => {
  const ajv = new Ajv();
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { emitter, events } = useContext(ModalContext);

  useEffect(() => {
    const unbind = emitter.on(events.IMPORT_MODAL, () => setOpen(true));

    return () => unbind();
  }, [emitter, events]);

  const importReactiveResumeJson = (event) => {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      const payload = JSON.parse(fr.result);
      const valid = ajv.validate(reactiveResumeSchema, payload);
      if (!valid) {
        ajv.errors.forEach((x) => toast.error(`Invalid Data: ${x.message}`));
        return;
      }
      dispatch({ type: 'on_import', payload });
      setOpen(false);
    });
    fr.readAsText(event.target.files[0]);
  };

  return (
    <BaseModal hideActions state={[open, setOpen]} title="Import Your Resume">
      <div>
        <h5 className="text-xl font-semibold mb-4">
          Import from Reactive Resume
        </h5>

        <p>
          Reactive Resume has it&apos;s own schema format to make the most of
          all the customizable capabilities it has to offer. If you&apos;d like
          to import a backup of your resume made with this app, just upload the
          file using the button below.
        </p>

        <Button className="mt-5" onClick={() => fileInputRef.current.click()}>
          Select File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={importReactiveResumeJson}
        />
      </div>

      <hr className="my-8" />

      <div>
        <h5 className="text-xl font-semibold mb-4">Import from JSON Resume</h5>

        <p>
          <a href="https://jsonresume.org/">JSON Resume</a> is an open standard
          for resume schema structure. If you are one of the many enthusiasts
          who have their resume ready in this format, all it takes it just one
          click to get started with Reactive Resume.
        </p>

        <Tooltip title="Coming Soon" placement="right" arrow>
          <div className="mt-5 inline-block">
            <Button className="opacity-50">Select File</Button>
          </div>
        </Tooltip>
      </div>

      <hr className="my-8" />

      <div>
        <h5 className="text-xl font-semibold mb-4">Import from LinkedIn</h5>

        <p>
          You can import a JSON that was exported from Reactive Resume by
          clicking on the button below and selecting the appropriate file.
        </p>

        <Tooltip title="Coming Soon" placement="right" arrow>
          <div className="mt-5 inline-block">
            <Button className="opacity-50">Select File</Button>
          </div>
        </Tooltip>
      </div>
    </BaseModal>
  );
};

export default memo(ImportModal);
