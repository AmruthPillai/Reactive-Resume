import { joiResolver } from '@hookform/resolvers/joi';
import { Add, AlternateEmail, DriveFileRenameOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Profile } from 'schema';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import BaseModal from '@/components/shared/BaseModal';
import { VALID_URL_REGEX } from '@/constants/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { addItem, editItem } from '@/store/resume/resumeSlice';

type FormData = Profile;

const path = 'sections.profile';

const defaultState: FormData = {
  network: '',
  username: '',
  url: '',
};

const schema = Joi.object<FormData>({
  id: Joi.string(),
  network: Joi.string().required(),
  username: Joi.string().required(),
  url: Joi.string().pattern(VALID_URL_REGEX, { name: 'valid URL' }).allow(''),
});

const ProfileModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen, payload } = useAppSelector((state) => state.modal[`builder.${path}`]);

  const item: FormData = get(payload, 'item', null);
  const isEditMode = useMemo(() => !!item, [item]);

  const addText = t('builder.common.actions.add', {
    token: t('builder.leftSidebar.sections.profiles.heading', { count: 1 }),
  });
  const editText = t('builder.common.actions.edit', {
    token: t('builder.leftSidebar.sections.profiles.heading', { count: 1 }),
  });

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const onSubmit = (formData: FormData) => {
    if (isEditMode) {
      dispatch(editItem({ path: 'basics.profiles', value: formData }));
    } else {
      dispatch(addItem({ path: 'basics.profiles', value: formData }));
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
      heading={isEditMode ? editText : addText}
      handleClose={handleClose}
      footerChildren={<Button onClick={handleSubmit(onSubmit)}>{isEditMode ? editText : addText}</Button>}
    >
      <form className="my-2 grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="network"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              autoFocus
              label={t('builder.leftSidebar.sections.profiles.form.network.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              label={t('builder.leftSidebar.sections.profiles.form.username.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                startAdornment: <AlternateEmail className="mr-2" />,
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="url"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('builder.common.form.url.label')}
              className="col-span-2"
              placeholder="https://"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </BaseModal>
  );
};

export default ProfileModal;
