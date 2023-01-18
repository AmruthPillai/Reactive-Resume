import { joiResolver } from '@hookform/resolvers/joi';
import { CrisisAlert, ManageAccounts } from '@mui/icons-material';
import { Button, Divider, TextField } from '@mui/material';
import Joi from 'joi';
import { useRouter } from 'next/router';
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
                    label="Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                )}
              />

              <p className="pl-4 text-[10.5px] opacity-50">
                You can update your profile picture on{' '}
                <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
                  Gravatar
                </a>
              </p>
            </div>
          </div>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                disabled
                label="Email"
                error={!!fieldState.error}
                helperText="It is not possible to update your email address at the moment, please create a new account instead."
                {...field}
              />
            )}
          />

          <div>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </form>

        <div className="my-2">
          <Divider />
        </div>

        <div className="flex items-center gap-2">
          <CrisisAlert />
          <h5 className="font-medium">Danger Zone</h5>
        </div>

        <p className="text-xs opacity-75">
          To delete your account, your data and all your resumes, type{' '}
          <code className="font-bold">&apos;delete&apos;</code> into the text box below and click on the button. Please
          note that this is an irreversible action and your data cannot be retrieved again.
        </p>

        <div className="flex max-w-xs flex-col gap-4">
          <TextField size="small" value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />

          <div>
            <Button variant="contained" color="error" disabled={!isDeleteTextValid} onClick={handleDelete}>
              Delete Your Data
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default UserProfileModal;
