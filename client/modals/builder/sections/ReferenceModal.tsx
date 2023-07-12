import { joiResolver } from '@hookform/resolvers/joi';
import { Add, DriveFileRenameOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Reference, SectionPath } from 'schema';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import BaseModal from '@/components/shared/BaseModal';
import MarkdownSupported from '@/components/shared/MarkdownSupported';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { addItem, editItem } from '@/store/resume/resumeSlice';

type FormData = Reference;

const path: SectionPath = 'sections.references';

const defaultState: FormData = {
  name: '',
  relationship: '',
  phone: '',
  email: '',
  summary: '',
};

const schema = Joi.object<FormData>().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  relationship: Joi.string().required(),
  phone: Joi.string().allow(''),
  email: Joi.string().allow(''),
  summary: Joi.string().allow(''),
});

const ReferenceModal: React.FC = () => {
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
          name="relationship"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              label={t('builder.leftSidebar.sections.references.form.relationship.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('builder.common.form.phone.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('builder.common.form.email.label')}
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
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </BaseModal>
  );
};

export default ReferenceModal;
