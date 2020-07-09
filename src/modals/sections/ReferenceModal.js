import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  name: '',
  position: '',
  contact: '',
  email: '',
  summary: '',
};

const schema = Yup.object().shape({
  name: Yup.string().required('This is a required field.'),
  position: Yup.string().required('This is a required field.'),
  contact: Yup.string(),
  email: Yup.string().email('Must be a valid email address.'),
  summary: Yup.string(),
});

const ReferenceModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Reference"
          path="references.items"
          event={ModalEvents.REFERENCE_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Name"
              placeholder="Jane Doe"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              label="position"
              placeholder="Assistant Manager"
              {...getFieldProps(formik, schema, 'position')}
            />

            <Input
              label="Phone Number"
              placeholder="+1 (708) 756-6065"
              {...getFieldProps(formik, schema, 'contact')}
            />

            <Input
              label="Email Address"
              placeholder="janedoe@example.com"
              {...getFieldProps(formik, schema, 'email')}
            />

            <Input
              type="textarea"
              label="Summary"
              className="col-span-2"
              {...getFieldProps(formik, schema, 'summary')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default ReferenceModal;
