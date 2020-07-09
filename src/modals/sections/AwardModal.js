import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  title: '',
  awarder: '',
  date: '',
  summary: '',
};

const schema = Yup.object().shape({
  title: Yup.string().required('This is a required field.'),
  awarder: Yup.string().required('This is a required field.'),
  date: Yup.date().max(new Date()),
  summary: Yup.string(),
});

const AwardModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Award"
          path="awards.items"
          event={ModalEvents.AWARD_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Title"
              className="col-span-2"
              placeholder="Intl. Flutter Hackathon '19"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label="Awarder"
              placeholder="Google"
              {...getFieldProps(formik, schema, 'awarder')}
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

export default memo(AwardModal);
