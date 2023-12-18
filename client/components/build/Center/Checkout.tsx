import { Money } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import Joi from 'joi';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { get } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Checkout, SectionPath } from 'schema';

// import mpesa from '/images/brand-logos/dark/mpesa.svg';
import BaseModal from '@/components/shared/BaseModal';
import { checkoutMain } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { cn } from '@/utils/styles';

import styles from './Checkout.module.scss';
// import { checkoutItems } from '@/store/resume/resumeSlice';

type FormData = Checkout;

const path: SectionPath = 'sections.checkout';

const defaultState: FormData = {
  phonenumber: '',
  whatsappNumber: '',
  userId: '',
  slug: '',
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
  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);
  // const [isOpen, setIsOpen] = useState(true);
  const slug = get(resume, 'slug');
  const username = get(resume, 'user.username');
  const updatedAt = get(resume, 'updatedAt');
  const [isSuccess, setIsSuccess] = useState('');
  const [number, setNumber] = useState(
    localStorage.getItem('whatsappNumber') ? localStorage.getItem('whatsappNumber')?.split('@')[0] : '',
  );
  const { open: isOpen } = useAppSelector((state) => state.modal['builder.sections.checkout']);
  const [errors, seterrors] = useState('');
  const user = get(resume, 'user');
  const name = get(user, 'name');
  const userId = get(user, 'id');
  const shortId = get(resume, 'shortId');
  const editText = useMemo(() => t('builder.common.actions.edit', { token: heading }), [t, heading]);
  const { errorsGlobal, successGlobal } = useAppSelector((state) => state.auth);

  // const { reset, control, handleSubmit } = useForm<FormData>({
  //   defaultValues: defaultState,
  //   resolver: joiResolver(schema),
  // });

  const onSubmit = () => {
    let cleanNumber = '';
    seterrors('');
    if (!number) {
      seterrors('Enter your Mpesa phonenumber to continue');
      return;
    }

    if (number.substring(0, 1) === '0') {
      cleanNumber = `254${number.substring(1, number.length)}`;
    } else {
      cleanNumber = number;
    }
    console.log(cleanNumber.substring(0, 3));
    if (cleanNumber.substring(0, 3) !== '254') {
      console.log(cleanNumber);
      seterrors('Please enter a valid Mpesa number');
      return;
    }

    // cleanNumber = number;

    const formData: any = {};
    const whatsappNumber: string | null = localStorage.getItem('whatsappNumber');
    if (whatsappNumber !== null) {
      formData.whatsappNumber = whatsappNumber;
    }

    formData.userId = userId;
    formData.slug = slug;
    formData.phonenumber = cleanNumber;
    // if (isEditMode) {
    dispatch(
      checkoutMain(
        formData,
        (data: any) => {
          setIsSuccess(
            'We have initiated an STK push for the premium version of your resume to your mobile device. Please follow the instructions on your phone to complete the payment process. Once we receive your payment, the premium product will be activated. This may take a few minutes. Thank you for choosing our premium service.',
          );
        },
        () => {
          seterrors('An error occurred while processing your payment kindly check the phonenumber and try again');
        },
      ),
    );
    // } else {
    //   //   dispatch(addItem({ path: `${path}.items`, value: formData }));
    // }

    // handleClose();
  };

  const handleExportPDF = async () => {
    const download = (await import('downloadjs')).default;

    const slug = get(resume, 'slug');
    const username = get(resume, 'user.username');
    const updatedAt = get(resume, 'updatedAt');

    const urlData: any = await mutateAsync({
      username,
      slug,
      lastUpdated: dayjs(updatedAt).unix().toString(),
      preview: 'true',
    });
    console.log(urlData);

    if (urlData.status === '200') {
      download(urlData.url);
    }
  };

  const handleClose = () => {
    setIsSuccess('');
    seterrors('');
    dispatch(
      setModalState({
        modal: `builder.sections.checkout`,
        state: { open: false },
      }),
    );
    // dispatch(updateResume(resume));
    // reset(defaultState);
  };

  // useEffect(() => {
  //   // if (!isEmpty(item)) {
  //   //   reset(item);
  //   // }
  // }, [reset]);

  return (
    <BaseModal
      icon={<Money />}
      isOpen={isOpen}
      handleClose={handleClose}
      heading={'Checkout'}
      footerChildren={
        <Button
          onClick={() => {
            !isSuccess ? handleExportPDF() : handleClose();
          }}
        >
          {!isSuccess ? 'Download Free Sample' : 'Close'}
        </Button>
      }
    >
      {!isSuccess ? (
        <p>
          <strong>Dear {name && name.split(' ').length > 0 ? name.split(' ')[0] : name}</strong>,<strong></strong>
          <br />
          <small>
            - You will instantly receive this CV pdf document on your Whatsapp with no watermark upon payment.
          </small>
          <br />
          <small>
            - You will also get unlimited access to this resume and download it at any time via download/edit link
            option on whatsapp.
          </small>
          <br />
          <small>
            <strong>
              Incase of any issue, kindly contact us on 0791186712, (If it is not receiving the CV/Resume after payment
              kindly foward the m-pesa message to the same number)
            </strong>
          </small>
        </p>
      ) : (
        <p>{isSuccess}</p>
      )}

      <hr />
      {!isSuccess && (
        <form className={cn(styles.checkout_form)} onSubmit={() => onSubmit}>
          <img className={cn(styles.mpesa)} src={`/images/brand-logos/dark/mpesa.svg`} />

          <TextField
            required
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              seterrors('');
            }}
            className={styles.mpesa_number}
            type="tel"
            label={'M-Pesa Number'}
            error={errors != ''}
            helperText={errors}
          />

          <span className={styles.free_sample}>
            <Button
              onClick={() => {
                onSubmit();
              }}
            >
              Buy
            </Button>
          </span>
        </form>
      )}
    </BaseModal>
  );
};

export default CheckoutModal;
