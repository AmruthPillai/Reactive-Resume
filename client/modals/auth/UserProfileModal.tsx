import { joiResolver } from '@hookform/resolvers/joi';
import { CrisisAlert, ManageAccounts } from '@mui/icons-material';
import { Button, Divider, TextField } from '@mui/material';
import Joi from 'joi';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import Avatar from '@/components/shared/Avatar';
import BaseModal from '@/components/shared/BaseModal';
import { deleteAccount, updateProfile, UpdateProfileParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  email: string;
};

const defaultState: FormData = {
  name: '',
  email: '',
};

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const UserProfileModal = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [deleteText, setDeleteText] = useState<string>('');
  const isDeleteTextValid = useMemo(() => deleteText.toLowerCase() === 'delete', [deleteText]);

  const user = useAppSelector((state) => state.auth.user);
  const { open: isOpen } = useAppSelector((state) => state.modal['auth.profile']);

  const { mutateAsync: deleteAccountMutation } = useMutation<void, ServerError>(deleteAccount);
  const { mutateAsync: updateProfileMutation } = useMutation<void, ServerError, UpdateProfileParams>(updateProfile);

  const { reset, getFieldState, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (user && !getFieldState('name').isTouched && !getFieldState('email').isTouched) {
      reset({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleClose = () => {
    dispatch(setModalState({ modal: 'auth.profile', state: { open: false } }));
  };

  const handleUpdate = handleSubmit(async (data) => {
    handleClose();
    await updateProfileMutation({ name: data.name });
  });

  const handleDelete = async () => {
    await deleteAccountMutation();
    handleClose();

    router.push('/');
  };

  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose} heading="Your Account" icon={<ManageAccounts />}>
      <div className="grid gap-4">
        <form className="grid gap-4 xl:w-2/3">
          <div className="flex items-center gap-4">
            <Avatar interactive={false} />

            <div className="grid flex-1 gap-1.5">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    autoFocus
                    label={t('modals.auth.profile.form.name.label')}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                )}
              />

              <p className="pl-4 text-[10.25px] opacity-50">
                <Trans t={t} i18nKey="modals.auth.profile.form.avatar.help-text">
                  You can update your profile picture on{' '}
                  <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
                    Gravatar
                  </a>
                </Trans>
              </p>
            </div>
          </div>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                disabled
                label={t('modals.auth.profile.form.email.label')}
                error={!!fieldState.error}
                helperText={t('modals.auth.profile.form.email.help-text')}
                {...field}
              />
            )}
          />

          <div>
            <Button onClick={handleUpdate}>{t('modals.auth.profile.actions.save')}</Button>
          </div>
        </form>

        <div className="my-2">
          <Divider />
        </div>

        <div className="flex items-center gap-2">
          <CrisisAlert />
          <h5 className="font-medium">{t('modals.auth.profile.delete-account.heading')}</h5>
        </div>

        <p className="text-xs opacity-75">{t('modals.auth.profile.delete-account.body', { keyword: 'delete' })}</p>

        <div className="flex max-w-xs flex-col gap-4">
          <TextField
            value={deleteText}
            placeholder="Type 'delete' to confirm"
            onChange={(e) => setDeleteText(e.target.value)}
          />

          <div>
            <Button variant="contained" color="error" disabled={!isDeleteTextValid} onClick={handleDelete}>
              {t('modals.auth.profile.delete-account.actions.delete')}
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default UserProfileModal;
