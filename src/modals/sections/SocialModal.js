import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  url: 'https://',
  network: '',
  username: '',
};

const schema = Yup.object().shape({
  network: Yup.string()
    .min(5, 'Please enter at least 5 characters.')
    .required('This is a required field.'),
  username: Yup.string().required('This is a required field.'),
  url: Yup.string()
    .min(5, 'Please enter at least 5 characters.')
    .required('This is a required field.')
    .url('Must be a valid URL'),
});

const SocialModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          path="social.items"
          name="Social Network"
          event={ModalEvents.SOCIAL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Network"
              placeholder="Twitter"
              {...getFieldProps(formik, schema, 'network')}
            />

            <Input
              label="Username"
              placeholder="KingOKings"
              {...getFieldProps(formik, schema, 'username')}
            />

            <Input
              label="URL"
              className="col-span-2"
              placeholder="https://twitter.com/KingOKings"
              {...getFieldProps(formik, schema, 'url')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(SocialModal);
