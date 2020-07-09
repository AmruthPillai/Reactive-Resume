import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  title: '',
  issuer: '',
  date: '',
  summary: '',
};

const schema = Yup.object().shape({
  title: Yup.string().required('This is a required field.'),
  issuer: Yup.string().required('This is a required field.'),
  date: Yup.date().max(new Date()),
  summary: Yup.string(),
});

const CertificateModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Certificate"
          path="certifications.items"
          event={ModalEvents.CERTIFICATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Title"
              className="col-span-2"
              placeholder="CCNP"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label="Issuer"
              placeholder="Cisco Systems"
              {...getFieldProps(formik, schema, 'issuer')}
            />

            <Input
              type="date"
              label="Date"
              {...getFieldProps(formik, schema, 'date')}
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

export default CertificateModal;
