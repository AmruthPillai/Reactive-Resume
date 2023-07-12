import { joiResolver } from '@hookform/resolvers/joi';
import { LockReset } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { resetPassword, ResetPasswordParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalState, setModalState } from '@/store/modal/modalSlice';

type Payload = {
  resetToken?: string;
};

type FormData = {
  password: string;
  confirmPassword: string;
};

const defaultState: FormData = {
  password: '',
  confirmPassword: '',
};

const schema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});

const ResetPasswordModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen, payload } = useAppSelector((state) => state.modal['auth.reset']) as ModalState;
  const resetData = get(payload, 'item', {}) as Payload;

  const { mutateAsync, isLoading } = useMutation<void, ServerError, ResetPasswordParams>(resetPassword);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const handleClose = () => {
    dispatch(setModalState({ modal: 'auth.reset', state: { open: false } }));
    reset();
  };

  const onSubmit = async ({ password }: FormData) => {
    if (!resetData.resetToken || isEmpty(resetData.resetToken)) return;

    await mutateAsync({ resetToken: resetData.resetToken, password });

    handleClose();
  };

  return (
    <BaseModal
      icon={<LockReset />}
      isOpen={isOpen}
      heading={t('modals.auth.reset-password.heading')}
      handleClose={handleClose}
      footerChildren={
        <Button type="submit" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          {t('modals.auth.reset-password.actions.set-password')}
        </Button>
      }
    >
      <p>{t('modals.auth.reset-password.body')}</p>

      <form className="grid gap-4 md:grid-cols-2">
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              autoFocus
              type="password"
              label={t('modals.auth.reset-password.form.password.label')}
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
              label={t('modals.auth.reset-password.form.confirm-password.label')}
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

export default ResetPasswordModal;
