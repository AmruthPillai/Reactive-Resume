import { joiResolver } from '@hookform/resolvers/joi';
import { Add } from '@mui/icons-material';
import { Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { Resume } from 'schema';
import Joi from 'joi';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { createResume, CreateResumeParams } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  slug: string;
  isPublic: boolean;
};

const defaultState: FormData = {
  name: '',
  slug: '',
  isPublic: true,
};

const schema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
  isPublic: Joi.boolean().default(true).required(),
});

const CreateResumeModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen } = useAppSelector((state) => state.modal['dashboard.create-resume']);

  const { mutateAsync, isLoading } = useMutation<Resume, ServerError, CreateResumeParams>(createResume);

  const { reset, watch, control, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
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

  const onSubmit = async ({ name, slug, isPublic }: FormData) => {
    await mutateAsync({ name, slug, public: isPublic });
    await queryClient.invalidateQueries(RESUMES_QUERY);

    handleClose();
  };

  const handleClose = () => {
    dispatch(setModalState({ modal: 'dashboard.create-resume', state: { open: false } }));
    reset();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      icon={<Add />}
      heading={t('modals.dashboard.create-resume.heading')}
      handleClose={handleClose}
      footerChildren={
        <Button type="submit" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {t('modals.dashboard.create-resume.actions.create-resume')}
        </Button>
      }
    >
      <p>{t('modals.dashboard.create-resume.body')}</p>

      <form className="grid gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              label={t('modals.dashboard.create-resume.form.name.label')}
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
              label={t('modals.dashboard.create-resume.form.slug.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <FormGroup>
          <FormControlLabel
            label={t('modals.dashboard.create-resume.form.public.label')}
            control={
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => <Switch defaultChecked color="secondary" {...field} />}
              />
            }
          />
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default CreateResumeModal;
