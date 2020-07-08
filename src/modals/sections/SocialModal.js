import { Formik } from 'formik';
import { get } from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import DataModal from '../DataModal';

const initialValues = {
  url: 'https://',
  network: '',
  username: '',
};

const validationSchema = Yup.object().shape({
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
  const getFieldProps = (formik, name) => ({
    touched: get(formik, `touched.${name}`, false),
    error: get(formik, `errors.${name}`, ''),
    isRequired: get(validationSchema, `fields.${name}._exclusive.required`),
    ...formik.getFieldProps(name),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={validationSchema}
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
              {...getFieldProps(formik, 'network')}
            />

            <Input
              label="Username"
              placeholder="KingOKings"
              {...getFieldProps(formik, 'username')}
            />

            <Input
              label="URL"
              className="col-span-2"
              placeholder="https://twitter.com/KingOKings"
              {...getFieldProps(formik, 'url')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default SocialModal;
