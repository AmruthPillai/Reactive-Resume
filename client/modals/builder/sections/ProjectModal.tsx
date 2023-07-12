import { joiResolver } from '@hookform/resolvers/joi';
import { Add, DriveFileRenameOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Project, SectionPath } from 'schema';
import dayjs from 'dayjs';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ArrayInput from '@/components/shared/ArrayInput';
import BaseModal from '@/components/shared/BaseModal';
import MarkdownSupported from '@/components/shared/MarkdownSupported';
import { VALID_URL_REGEX } from '@/constants/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { addItem, editItem } from '@/store/resume/resumeSlice';

type FormData = Project;

const path: SectionPath = 'sections.projects';

const defaultState: FormData = {
  name: '',
  description: '',
  date: {
    start: '',
    end: '',
  },
  url: '',
  summary: '',
  keywords: [],
};

const schema = Joi.object<FormData>().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.object().keys({
    start: Joi.string().allow(''),
    end: Joi.string().allow(''),
  }),
  url: Joi.string().pattern(VALID_URL_REGEX, { name: 'valid URL' }).allow(''),
  summary: Joi.string().allow(''),
  keywords: Joi.array().items(Joi.string().optional()),
});

const ProjectModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector((state) => get(state.resume.present, `${path}.name`));
  const { open: isOpen, payload } = useAppSelector((state) => state.modal[`builder.${path}`]);

  const item: FormData = get(payload, 'item', null);
  const isEditMode = useMemo(() => !!item, [item]);

  const addText = useMemo(() => t('builder.common.actions.add', { token: heading }), [t, heading]);
  const editText = useMemo(() => t('builder.common.actions.edit', { token: heading }), [t, heading]);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const onSubmit = (formData: FormData) => {
    if (isEditMode) {
      dispatch(editItem({ path: `${path}.items`, value: formData }));
    } else {
      dispatch(addItem({ path: `${path}.items`, value: formData }));
    }

    handleClose();
  };

  const handleClose = () => {
    dispatch(
      setModalState({
        modal: `builder.${path}`,
        state: { open: false },
      }),
    );

    reset(defaultState);
  };

  useEffect(() => {
    if (!isEmpty(item)) {
      reset(item);
    }
  }, [item, reset]);

  return (
    <BaseModal
      icon={isEditMode ? <DriveFileRenameOutline /> : <Add />}
      isOpen={isOpen}
      handleClose={handleClose}
      heading={isEditMode ? editText : addText}
      footerChildren={<Button onClick={handleSubmit(onSubmit)}>{isEditMode ? editText : addText}</Button>}
    >
      <form className="my-2 grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              autoFocus
              label={t('builder.common.form.name.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              label={t('builder.common.form.description.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="date.start"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              openTo="year"
              inputRef={field.ref}
              label={t('builder.common.form.start-date.label')}
              value={dayjs(field.value)}
              views={['year', 'month', 'day']}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || params.inputProps?.placeholder}
                  />
                ),
              }}
              onChange={(date: dayjs.Dayjs | null) => {
                date && dayjs(date).isValid() && field.onChange(dayjs(date).format('YYYY-MM-DD'));
              }}
            />
          )}
        />

        <Controller
          name="date.end"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              openTo="year"
              inputRef={field.ref}
              label={t('builder.common.form.end-date.label')}
              value={dayjs(field.value)}
              views={['year', 'month', 'day']}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || t('builder.common.form.end-date.help-text')}
                  />
                ),
              }}
              onChange={(date: dayjs.Dayjs | null) => {
                date && dayjs(date).isValid() && field.onChange(dayjs(date).format('YYYY-MM-DD'));
              }}
            />
          )}
        />

        <Controller
          name="url"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('builder.common.form.url.label')}
              placeholder="https://"
              className="col-span-2"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="summary"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              multiline
              minRows={3}
              maxRows={6}
              label={t('builder.common.form.summary.label')}
              className="col-span-2"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || <MarkdownSupported />}
              {...field}
            />
          )}
        />

        <Controller
          name="keywords"
          control={control}
          render={({ field, fieldState }) => (
            <ArrayInput
              label={t('builder.common.form.keywords.label')}
              value={field.value as string[]}
              onChange={field.onChange}
              errors={fieldState.error}
              className="col-span-2"
            />
          )}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </BaseModal>
  );
};

export default ProjectModal;
