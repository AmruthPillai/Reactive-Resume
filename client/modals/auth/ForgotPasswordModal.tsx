import { joiResolver } from '@hookform/resolvers/joi';
import { Password } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Joi from 'joi';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { forgotPassword, ForgotPasswordParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  email: string;
};

const defaultState: FormData = {
  email: '',
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const ForgotPasswordModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen } = useAppSelector((state) => state.modal['auth.forgot']);

  const { mutate, isLoading } = useMutation<void, ServerError, ForgotPasswordParams>(forgotPassword);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const handleClose = () => {
    dispatch(setModalState({ modal: 'auth.forgot', state: { open: false } }));
    reset();
  };

  const onSubmit = ({ email }: FormData) => {
    mutate({ email }, { onSettled: handleClose });
  };

  return (
    <>
      <BaseModal
        icon={<Password />}
        isOpen={isOpen}
        heading={t('modals.auth.forgot-password.heading')}
        handleClose={handleClose}
        footerChildren={
          <Button type="submit" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            {t('modals.auth.forgot-password.actions.send-email')}
          </Button>
        }
      >
        <div className="grid gap-4">
          <p>{t('modals.auth.forgot-password.body')}</p>

          <form className="grid gap-4 xl:w-2/3">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  autoFocus
                  label={t('modals.auth.forgot-password.form.email.label')}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </form>

          <p className="text-xs">{t('modals.auth.forgot-password.help-text')}</p>
        </div>
      </BaseModal>
    </>
  );
};

export default ForgotPasswordModal;
