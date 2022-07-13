import env from '@beam-australia/react-env';
import { joiResolver } from '@hookform/resolvers/joi';
import { Google, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Joi from 'joi';
import { isEmpty } from 'lodash';
import { Trans, useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIsMutating, useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { FLAG_DISABLE_SIGNUPS } from '@/constants/flags';
import { login, LoginParams, loginWithGoogle, LoginWithGoogleParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

declare const google: any;

type FormData = {
  identifier: string;
  password: string;
};

const defaultState: FormData = {
  identifier: '',
  password: '',
};

const schema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const LoginModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const isMutating = useIsMutating();
  const isLoading = useMemo(() => isMutating > 0, [isMutating]);

  const { open: isOpen } = useAppSelector((state) => state.modal['auth.login']);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const { mutateAsync: loginMutation } = useMutation<void, ServerError, LoginParams>(login);

  const { mutateAsync: loginWithGoogleMutation } = useMutation<void, ServerError, LoginWithGoogleParams>(
    loginWithGoogle
  );

  const handleClose = () => {
    dispatch(setModalState({ modal: 'auth.login', state: { open: false } }));
    reset();
  };

  const onSubmit = async ({ identifier, password }: FormData) => {
    await loginMutation(
      { identifier, password },
      {
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );

    handleClose();
  };

  const handleCreateAccount = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  };

  const handleRecoverAccount = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.forgot', state: { open: true } }));
  };

  const handleLoginWithGoogle = async () => {
    google.accounts.id.initialize({
      auto_select: true,
      itp_support: true,
      client_id: env('GOOGLE_CLIENT_ID'),
      callback: async (response: any) => {
        await loginWithGoogleMutation({ credential: response.credential });

        handleClose();
      },
    });

    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        const reason = notification.getNotDisplayedReason() || notification.getSkippedReason();

        toast.error(`Google returned an error while trying to sign in: ${reason}.`);
        toast("Please try logging in using email/password, or use another browser that supports Google's One Tap API.");
      }
    });
  };

  const PasswordVisibility = (): React.ReactElement => {
    const handleToggle = () => setShowPassword((showPassword) => !showPassword);

    return (
      <InputAdornment position="end">
        <IconButton edge="end" onClick={handleToggle}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <BaseModal
      icon={<Login />}
      isOpen={isOpen}
      heading={t<string>('modals.auth.login.heading')}
      handleClose={handleClose}
      footerChildren={
        <div className="flex gap-4">
          {!isEmpty(env('GOOGLE_CLIENT_ID')) && (
            <Button
              type="submit"
              variant="outlined"
              disabled={isLoading}
              startIcon={<Google />}
              onClick={handleLoginWithGoogle}
            >
              {t<string>('modals.auth.login.actions.google')}
            </Button>
          )}

          <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            {t<string>('modals.auth.login.actions.login')}
          </Button>
        </div>
      }
    >
      <p>{t<string>('modals.auth.login.body')}</p>

      <form className="grid gap-4 xl:w-2/3">
        <Controller
          name="identifier"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              label={t<string>('modals.auth.login.form.username.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message || t<string>('modals.auth.login.form.username.help-text')}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              type={showPassword ? 'text' : 'password'}
              label={t<string>('modals.auth.login.form.password.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{ endAdornment: <PasswordVisibility /> }}
              {...field}
            />
          )}
        />
      </form>

      {!FLAG_DISABLE_SIGNUPS && (
        <p className="text-xs">
          <Trans t={t} i18nKey="modals.auth.login.register-text">
            If you don&apos;t have one, you can <a onClick={handleCreateAccount}>create an account</a> here.
          </Trans>
        </p>
      )}

      <p className="text-xs">
        <Trans t={t} i18nKey="modals.auth.login.recover-text">
          In case you have forgotten your password, you can <a onClick={handleRecoverAccount}>recover your account</a>
          here.
        </Trans>
      </p>
    </BaseModal>
  );
};

export default LoginModal;
