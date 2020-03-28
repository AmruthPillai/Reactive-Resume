/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';

const ActionsTab = ({ data, theme, dispatch }) => {
  const fileInputRef = useRef(null);

  const importJson = event => {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      const importedObject = JSON.parse(fr.result);
      dispatch({ type: 'import_data', payload: importedObject });
      dispatch({ type: 'save_data' });
    });
    fr.readAsText(event.target.files[0]);
  };

  const exportToJson = () => {
    const backupObj = { data, theme };
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupObj))}`;
    const dlAnchor = document.getElementById('downloadAnchor');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `RxResumeBackup_${Date.now()}.json`);
    dlAnchor.click();
  };

  const loadDummyData = () => {
    dispatch({ type: 'load_dummy_data' });
    dispatch({ type: 'save_data' });
  };

  const resetEverything = () => {
    dispatch({ type: 'reset' });
    dispatch({ type: 'save_data' });
  };

  return (
    <div>
      <div className="shadow text-center text-sm p-5">
        Changes you make to your resume are saved automatically to your browser&apos;s local
        storage. No data gets out, hence your information is completely secure.
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Import/Export</h6>

        <p className="text-sm">
          You can import or export your data in JSON format. With this, you can edit and print your
          resume from any device. Save this file for later use.
        </p>

        <input ref={fileInputRef} type="file" className="hidden" onChange={importJson} />
        <a id="downloadAnchor" className="hidden" />

        <div className="mt-4 grid grid-cols-2 col-gap-6">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">publish</i>
              <span className="text-sm">Import</span>
            </div>
          </button>

          <button
            type="button"
            onClick={exportToJson}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">get_app</i>
              <span className="text-sm">Export</span>
            </div>
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Print Your Resume</h6>

        <div className="text-sm">
          You can simply press <pre className="inline font-bold">Cmd/Ctrl + P</pre> at any time
          while you&apos;re in the app to print your resume, but here&apos;s a fancy button to do
          the same thing, just &apos;cause.
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">print</i>
            <span className="text-sm">Print</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Load Dummy Data</h6>

        <div className="text-sm">
          Unclear on what to do with a fresh blank page? Load some dummy data with pre-populated
          values to see how a resume should look and you can start editing from there.
        </div>

        <button
          type="button"
          onClick={loadDummyData}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">flight_takeoff</i>
            <span className="text-sm">Populate Data</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">Reset Everything!</h6>

        <div className="text-sm">
          This action will reset all your data and remove backups made to your browser&apos;s local
          storage as well, so please make sure you have exported your information before you reset
          everything.
        </div>

        <button
          type="button"
          onClick={resetEverything}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">refresh</i>
            <span className="text-sm">Reset</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionsTab;
