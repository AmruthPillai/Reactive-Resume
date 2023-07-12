import { joiResolver } from '@hookform/resolvers/joi';
import { DriveFileRenameOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Resume } from 'schema';
import Joi from 'joi';
import get from 'lodash/get';
import noop from 'lodash/noop';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { renameResume, RenameResumeParams } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalState, setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  slug: string;
};

const schema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
});

const RenameResumeModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen, payload } = useAppSelector((state) => state.modal['dashboard.rename-resume']) as ModalState;
  const resume: Resume = get(payload, 'item') as Resume;
  const onComplete = get(payload, 'onComplete', noop);

  const { mutateAsync, isLoading } = useMutation<Resume, ServerError, RenameResumeParams>(renameResume);

  const { reset, watch, control, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: resume?.name,
      slug: resume?.slug,
    },
    resolver: joiResolver(schema),
  });
  const name = watch('name');

  useEffect(() => {
    const slug = name
      ? name
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/[ ]/gi, '-')
      : '';

    setValue('slug', slug);
  }, [name, setValue]);

  useEffect(() => {
    if (!resume) return;

    const { name, slug }: FormData = resume;

    reset({ name, slug });
  }, [resume, reset]);

  const onSubmit = async ({ name, slug }: FormData) => {
    if (!resume) return;

    const newResume = await mutateAsync({ id: resume.id, name, slug });

    onComplete && onComplete(newResume);

    queryClient.invalidateQueries(RESUMES_QUERY);

    handleClose();
  };

  const handleClose = () => {
    dispatch(setModalState({ modal: 'dashboard.rename-resume', state: { open: false } }));
    reset();
  };

  return (
    <BaseModal
      icon={<DriveFileRenameOutline />}
      isOpen={isOpen}
      heading={t('modals.dashboard.rename-resume.heading')}
      handleClose={handleClose}
      footerChildren={
        <Button type="submit" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {t('modals.dashboard.rename-resume.actions.rename-resume')}
        </Button>
      }
    >
      <form className="grid gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              label={t('modals.dashboard.rename-resume.form.name.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="slug"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('modals.dashboard.rename-resume.form.slug.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </form>
    </BaseModal>
  );
};

export default RenameResumeModal;
