/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const ActionsTab = ({ data, theme, dispatch }) => {
  const { t } = useTranslation('rightSidebar');
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
      <div className="shadow text-center text-sm p-5">{t('actions.disclaimer')}</div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.importExport.heading')}</h6>

        <p className="text-sm">{t('actions.importExport.body')}</p>

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
              <span className="text-sm">{t('actions.importExport.buttons.import')}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={exportToJson}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons mr-2 font-bold text-base">get_app</i>
              <span className="text-sm">{t('actions.importExport.buttons.export')}</span>
            </div>
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.printResume.heading')}</h6>

        <div className="text-sm">
          <Trans t={t} i18nKey="actions.printResume.body">
            You can simply press <pre className="inline font-bold">Cmd/Ctrl + P</pre> at any time
            while you&apos;re in the app to print your resume, but here&apos;s a fancy button to do
            the same thing, just &apos;cause.
          </Trans>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">print</i>
            <span className="text-sm">{t('actions.printResume.buttons.print')}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.loadDummyData.heading')}</h6>

        <div className="text-sm">{t('actions.loadDummyData.body')}</div>

        <button
          type="button"
          onClick={loadDummyData}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">flight_takeoff</i>
            <span className="text-sm">{t('actions.loadDummyData.buttons.loadData')}</span>
          </div>
        </button>
      </div>

      <hr className="my-6" />

      <div className="shadow text-center p-5">
        <h6 className="font-bold text-sm mb-2">{t('actions.reset.heading')}</h6>

        <div className="text-sm">{t('actions.reset.body')}</div>

        <button
          type="button"
          onClick={resetEverything}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex justify-center items-center">
            <i className="material-icons mr-2 font-bold text-base">refresh</i>
            <span className="text-sm">{t('actions.reset.buttons.reset')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionsTab;
