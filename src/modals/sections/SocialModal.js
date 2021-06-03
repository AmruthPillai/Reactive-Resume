import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';

const initialValues = {
  url: '',
  network: '',
  username: '',
};

const SocialModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    network: Yup.string()
      .min(5, t('shared.forms.validation.min', { number: 5 }))
      .required(t('shared.forms.validation.required')),
    username: Yup.string().required(t('shared.forms.validation.required')),
    url: Yup.string()
      .min(5, t('shared.forms.validation.min', { number: 5 }))
      .required(t('shared.forms.validation.required')),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          path="social.items"
          name={t('builder.sections.social')}
          event={ModalEvents.SOCIAL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('builder.social.network')}
              placeholder="Twitter"
              {...getFieldProps(formik, schema, 'network')}
            />

            <Input
              label={t('builder.social.username')}
              placeholder="KingOKings"
              {...getFieldProps(formik, schema, 'username')}
            />

            <Input
              label={t('builder.social.url')}
              className="col-span-2"
              placeholder="https://"
              {...getFieldProps(formik, schema, 'url')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(SocialModal);
