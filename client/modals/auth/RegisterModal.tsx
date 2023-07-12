import env from '@beam-australia/react-env';
import { joiResolver } from '@hookform/resolvers/joi';
import { HowToReg } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Joi from 'joi';
import isEmpty from 'lodash/isEmpty';
import { Trans, useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { loginWithGoogle, LoginWithGoogleParams, register as registerUser, RegisterParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultState: FormData = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const schema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});

const RegisterModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen } = useAppSelector((state) => state.modal['auth.register']);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation<void, ServerError, RegisterParams>(registerUser);

  const { mutateAsync: loginWithGoogleMutation } = useMutation<void, ServerError, LoginWithGoogleParams>(
    loginWithGoogle,
  );

  const handleClose = () => {
    dispatch(setModalState({ modal: 'auth.register', state: { open: false } }));
    reset();
  };

  const onSubmit = async ({ name, username, email, password }: FormData) => {
    await mutateAsync({ name, username, email, password });
    handleClose();
  };

  const handleLogin = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  };

  const handleLoginWithGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      await loginWithGoogleMutation({ credential: response.credential }, { onError: handleGoogleLoginError });

      handleClose();
    }
  };

  const handleGoogleLoginError = () => {
    toast("Google doesn't seem to be responding, please try logging in using email/password instead.");
  };

  return (
    <BaseModal
      icon={<HowToReg />}
      isOpen={isOpen}
      heading={t('modals.auth.register.heading')}
      handleClose={handleClose}
      footerChildren={
        <div className="flex gap-4">
          {!isEmpty(env('GOOGLE_CLIENT_ID')) && (
            <GoogleLogin onSuccess={handleLoginWithGoogle} onError={handleGoogleLoginError} />
          )}

          <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            {t('modals.auth.register.actions.register')}
          </Button>
        </div>
      }
    >
      <p>{t('modals.auth.register.body')}</p>

      <form className="grid gap-4 md:grid-cols-2">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              label={t('modals.auth.register.form.name.label')}
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
              label={t('modals.auth.register.form.username.label')}
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
              type="email"
              label={t('modals.auth.register.form.email.label')}
              className="col-span-2"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              type="password"
              label={t('modals.auth.register.form.password.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              type="password"
              label={t('modals.auth.register.form.confirm-password.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </form>

      <p className="text-xs">
        <Trans t={t} i18nKey="modals.auth.register.loginText">
          If you already have an account, you can <a onClick={handleLogin}>login here</a>.
        </Trans>
      </p>
    </BaseModal>
  );
};

export default RegisterModal;
