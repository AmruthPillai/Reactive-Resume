import { joiResolver } from '@hookform/resolvers/joi';
import { Google, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Joi from 'joi';
import { Trans, useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIsMutating, useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { login, LoginParams, loginWithGoogle, LoginWithGoogleParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

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

  const { signIn } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onSuccess: async (response: GoogleLoginResponse) => {
      await loginWithGoogleMutation({ accessToken: response.accessToken });

      handleClose();
    },
  });

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

  const handleLoginWithGoogle = () => {
    signIn();
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
      heading={t('modals.auth.login.heading')}
      handleClose={handleClose}
      footerChildren={
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="outlined"
            disabled={isLoading}
            startIcon={<Google />}
            onClick={handleLoginWithGoogle}
          >
            {t('modals.auth.login.actions.login-google')}
          </Button>

          <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            {t('modals.auth.login.actions.login')}
          </Button>
        </div>
      }
    >
      <p>{t('modals.auth.login.body')}</p>

      <form className="grid gap-4 xl:w-2/3">
        <Controller
          name="identifier"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              label={t('modals.auth.login.form.username.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message || t('modals.auth.login.form.username.help-text')}
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
              label={t('modals.auth.login.form.password.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{ endAdornment: <PasswordVisibility /> }}
              {...field}
            />
          )}
        />
      </form>

      <p className="text-xs">
        <Trans t={t} i18nKey="modals.auth.login.register-text">
          If you don&apos;t have one, you can <a onClick={handleCreateAccount}>create an account</a> here.
        </Trans>
      </p>

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
