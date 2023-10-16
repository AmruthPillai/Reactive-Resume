import { joiResolver } from '@hookform/resolvers/joi';
import { Money } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Joi from 'joi';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { Controller, get, useForm } from 'react-hook-form';
import { Checkout, SectionPath } from 'schema';

import BaseModal from '@/components/shared/BaseModal';
import { checkoutMain } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
// import { checkoutItems } from '@/store/resume/resumeSlice';

type FormData = Checkout;

const path: SectionPath = 'sections.checkout';

const defaultState: FormData = {
  phonenumber: '',
  whatsappNumber: '',
  userId: '',
  shortId: '',
};

const schema = Joi.object<FormData>().keys({
  phonenumber: Joi.string().required(),
});

const CheckoutModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { past, present: resume, future } = useAppSelector((state) => state.resume);
  const heading = 'Checkout';
  const [payload, setPayload] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const slug = get(resume, 'slug');
  const username = get(resume, 'user.username');
  const updatedAt = get(resume, 'updatedAt');
  const user = get(resume, 'user');
  const name = get(user, 'name');
  const userId = get(user, 'id');
  const shortId = get(resume, 'shortId');
  console.log(resume);
  //   const { open: isOpen,  } = useState({ open: { isOpen: true }, payload: {} });

  //   const { open: isOpen, payload } = useAppSelector((state) => state.modal[`builder.${path}`]);

  //   const item: FormData = get(payload, 'item', null);
  //   const isEditMode = useMemo(() => !!item, [item]);
  //   const addText = useMemo(() => t('builder.common.actions.add', { token: heading }), [t, heading]);
  const editText = useMemo(() => t('builder.common.actions.edit', { token: heading }), [t, heading]);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const onSubmit = () => {
    const formData: any = {};
    const whatsappNumber: string | null = localStorage.getItem('whatsappNumber');
    if (whatsappNumber !== null) {
      formData.whatsappNumber = whatsappNumber;
    }
    formData.userId = userId;
    formData.shortId = shortId;
    // if (isEditMode) {
    dispatch(
      checkoutMain(formData, (data: any) => {
        alert(data);
      }),
    );
    // } else {
    //   //   dispatch(addItem({ path: `${path}.items`, value: formData }));
    // }

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
    // if (!isEmpty(item)) {
    //   reset(item);
    // }
  }, [reset]);

  return (
    <BaseModal
      icon={<Money />}
      isOpen={isOpen}
      handleClose={handleClose}
      heading={'Checkout'}
      footerChildren={<Button onClick={() => onSubmit()}>{'Buy'}</Button>}
    >
      <h2>Payment Required</h2>
      <p>
        Dear {name}, Kindly make a payment of{' '}
        <strong>Kshs 50 via M-pesa to be able to download premium version of this CV.</strong>
        <br />
        <span>Currently you can only generate preview sample which contains our watermark.</span>
      </p>
      <form className="my-1 grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phonenumber"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              type="number"
              label={'M-Pesa Number'}
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

export default CheckoutModal;
