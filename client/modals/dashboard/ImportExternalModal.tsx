import { Code, ImportExport, LinkedIn, TrackChanges, UploadFile } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import { Integration, Resume } from 'schema';
import { Trans, useTranslation } from 'next-i18next';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import { importFromExternal, ImportFromExternalParams } from '@/services/integrations';
import queryClient from '@/services/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

const FILE_UPLOAD_MAX_SIZE = 2000000; // 2 MB

const ImportExternalModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const linkedinInputRef = useRef<HTMLInputElement>(null);
  const jsonResumeInputRef = useRef<HTMLInputElement>(null);
  const reactiveResumeInputRef = useRef<HTMLInputElement>(null);
  const reactiveResumeV2InputRef = useRef<HTMLInputElement>(null);

  const { open: isOpen } = useAppSelector((state) => state.modal['dashboard.import-external']);

  const { mutateAsync, isLoading } = useMutation<Resume, ServerError, ImportFromExternalParams>(importFromExternal);

  const handleClose = () => {
    dispatch(setModalState({ modal: 'dashboard.import-external', state: { open: false } }));
  };

  const handleClick = (integration: Integration) => {
    if (integration === 'linkedin') {
      if (linkedinInputRef.current) {
        linkedinInputRef.current.click();
        linkedinInputRef.current.value = '';
      }
    } else if (integration === 'json-resume') {
      if (jsonResumeInputRef.current) {
        jsonResumeInputRef.current.click();
        jsonResumeInputRef.current.value = '';
      }
    } else if (integration === 'reactive-resume') {
      if (reactiveResumeInputRef.current) {
        reactiveResumeInputRef.current.click();
        reactiveResumeInputRef.current.value = '';
      }
    } else if (integration === 'reactive-resume-v2') {
      if (reactiveResumeV2InputRef.current) {
        reactiveResumeV2InputRef.current.click();
        reactiveResumeV2InputRef.current.value = '';
      }
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, integration: Integration) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > FILE_UPLOAD_MAX_SIZE) {
        toast.error(t('common.toast.error.upload-file-size'));
        return;
      }

      await mutateAsync({ integration, file });
      queryClient.invalidateQueries(RESUMES_QUERY);

      handleClose();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      icon={<ImportExport />}
      heading={t('modals.dashboard.import-external.heading')}
      handleClose={handleClose}
    >
      <div className="grid gap-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-medium">
          <LinkedIn />
          {t('modals.dashboard.import-external.linkedin.heading')}
        </h2>

        <p className="mb-2">
          <Trans t={t} i18nKey="modals.dashboard.import-external.linkedin.body">
            You can save time by exporting your data from LinkedIn and using it to auto-fill fields on Reactive Resume.
            Head over to the
            <a
              href="https://www.linkedin.com/psettings/member-data"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              Data Privacy
            </a>
            section on LinkedIn and request an archive of your data. Once it is available, upload the ZIP file below.
          </Trans>
        </p>

        <div>
          <Button
            variant="contained"
            disabled={isLoading}
            startIcon={<UploadFile />}
            onClick={() => handleClick('linkedin')}
          >
            {t('modals.dashboard.import-external.linkedin.actions.upload-archive')}
          </Button>

          <input
            hidden
            type="file"
            ref={linkedinInputRef}
            onChange={(event) => handleChange(event, 'linkedin')}
            accept="application/zip"
          />
        </div>
      </div>

      <Divider className="py-2" />

      <div className="grid gap-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-medium">
          <Code />
          {t('modals.dashboard.import-external.json-resume.heading')}
        </h2>

        <p className="mb-2">
          <Trans t={t} i18nKey="modals.dashboard.import-external.json-resume.body">
            If you have a
            <a
              href="https://github.com/jsonresume/resume-schema"
              className="underline"
              rel="noreferrer"
              target="_blank"
            >
              validated JSON Resume
            </a>
            ready to go, you can use it to fast-track your development on Reactive Resume. Click the button below and
            upload a valid JSON file to begin.
          </Trans>
        </p>

        <div>
          <Button
            variant="contained"
            disabled={isLoading}
            startIcon={<UploadFile />}
            onClick={() => handleClick('json-resume')}
          >
            {t('modals.dashboard.import-external.json-resume.actions.upload-json')}
          </Button>

          <input
            hidden
            type="file"
            ref={jsonResumeInputRef}
            onChange={(event) => handleChange(event, 'json-resume')}
            accept="application/json"
          />
        </div>
      </div>

      <Divider className="py-2" />

      <div className="grid gap-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-medium">
          <TrackChanges />
          {t('modals.dashboard.import-external.reactive-resume.heading')}
        </h2>

        <p className="mb-2">{t('modals.dashboard.import-external.reactive-resume.body')}</p>

        <div className="flex gap-4">
          <Button
            variant="contained"
            disabled={isLoading}
            startIcon={<UploadFile />}
            onClick={() => handleClick('reactive-resume')}
          >
            {t('modals.dashboard.import-external.reactive-resume.actions.upload-json')}
          </Button>

          <Button
            variant="contained"
            disabled={isLoading}
            startIcon={<UploadFile />}
            onClick={() => handleClick('reactive-resume-v2')}
          >
            {t('modals.dashboard.import-external.reactive-resume.actions.upload-json-v2')}
          </Button>

          <input
            hidden
            type="file"
            ref={reactiveResumeInputRef}
            onChange={(event) => handleChange(event, 'reactive-resume')}
            accept="application/json"
          />

          <input
            hidden
            type="file"
            ref={reactiveResumeV2InputRef}
            onChange={(event) => handleChange(event, 'reactive-resume-v2')}
            accept="application/json"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default ImportExternalModal;
