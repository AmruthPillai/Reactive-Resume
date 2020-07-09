import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  name: '',
  fluency: '',
};

const schema = Yup.object().shape({
  name: Yup.string().required('This is a required field.'),
  fluency: Yup.string().required('This is a required field.'),
});

const LanguageModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Language"
          path="languages.items"
          event={ModalEvents.LANGUAGE_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Name"
              placeholder="German"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              label="Fluency"
              placeholder="Native/B1"
              {...getFieldProps(formik, schema, 'fluency')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default LanguageModal;
