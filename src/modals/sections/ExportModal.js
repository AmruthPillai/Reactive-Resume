import { clone } from 'lodash';
import React, { memo, useContext, useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import Button from '../../components/shared/Button';
import ModalContext from '../../contexts/ModalContext';
import { useSelector } from '../../contexts/ResumeContext';
import BaseModal from '../BaseModal';

const ExportModal = () => {
  const state = useSelector();
  const [open, setOpen] = useState(false);
  const [isLoadingSingle, setLoadingSingle] = useState(false);
  const [isLoadingMulti, setLoadingMulti] = useState(false);
  const functionsUrl = 'https://us-central1-rx-resume.cloudfunctions.net';

  const { emitter, events } = useContext(ModalContext);

  useEffect(() => {
    const unbind = emitter.on(events.EXPORT_MODAL, () => setOpen(true));

    return () => unbind();
  }, [emitter, events]);

  const handleOpenPrintDialog = () => {
    if (typeof window !== `undefined`) {
      window && window.print();
    }
  };

  const openFile = (blob) => {
    if (typeof window !== `undefined`) {
      const url = window.URL.createObjectURL(blob, { oneTimeOnly: true });
      window && window.open(url);
      setLoadingSingle(false);
    }
  };

  const handleSinglePageDownload = async () => {
    setLoadingSingle(true);
    fetch(`${functionsUrl}/printSinglePageResume?id=${state.id}`, {
      method: 'POST',
    })
      .then((response) => response.blob())
      .then(openFile);
  };

  const handleMultiPageDownload = async () => {
    setLoadingMulti(true);
    fetch(`${functionsUrl}/printMultiPageResume?id=${state.id}`, {
      method: 'POST',
    })
      .then((response) => response.blob())
      .then(openFile);
  };

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

  return (
    <BaseModal hideActions state={[open, setOpen]} title="Export Your Resume">
      <div>
        <h5 className="text-xl font-semibold mb-4">
          Use Browser&apos;s Print Dialog
        </h5>

        <p className="leading-loose">
          For those of you who want a quick solution, you need not look any
          further than your browser. All you have to do is press Ctrl/Cmd + P
          and open up the print dialog on your browser and get your resume
          printed immediately.
        </p>

        <Button icon={FaPrint} className="mt-5" onClick={handleOpenPrintDialog}>
          Print Resume
        </Button>
      </div>

      <hr className="my-8" />

      <div>
        <h5 className="text-xl font-semibold mb-4">Download PDF</h5>

        <p className="leading-loose">
          These options allow you to print a single page, unconstrained version
          of your resume, perfect for those who have a lot of content.
          Alternatively, you could download a multi-page version of your resume
          as well with just one click.
        </p>

        <div className="mt-5 mb-4">
          <div className="flex">
            <Button
              isLoading={isLoadingSingle}
              onClick={handleSinglePageDownload}
            >
              Single Page Resume
            </Button>
            <Button
              className="ml-8"
              isLoading={isLoadingMulti}
              onClick={handleMultiPageDownload}
            >
              Multi Page Resume
            </Button>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h5 className="text-xl font-semibold mb-4">Export to JSON Format</h5>

        <p className="leading-loose">
          You can also export your data into JSON format for safe keeping so
          that you can easily import it back into Reactive Resume whenever you
          want to edit or generate a resume.
        </p>

        <div className="mt-5">
          <Button onClick={handleExportToJson}>Export JSON</Button>
          <a id="downloadAnchor" className="hidden">
            Export JSON
          </a>
        </div>
      </div>
    </BaseModal>
  );
};

export default memo(ExportModal);
