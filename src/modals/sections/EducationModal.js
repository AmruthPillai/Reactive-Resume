import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  institution: '',
  field: '',
  degree: '',
  gpa: '',
  startDate: '',
  endDate: '',
  summary: '',
};

const schema = Yup.object().shape({
  institution: Yup.string().required('This is a required field.'),
  field: Yup.string().required('This is a required field.'),
  degree: Yup.string(),
  gpa: Yup.string(),
  startDate: Yup.date().required('This is a required field.'),
  endDate: Yup.date().when(
    'startDate',
    (startDate, yupSchema) =>
      startDate &&
      yupSchema.min(startDate, 'End Date must be later than Start Date'),
  ),
  summary: Yup.string().min(10, 'Please enter at least 10 characters.'),
});

const EducationModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Education"
          path="education.items"
          event={ModalEvents.EDUCATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Institution"
              className="col-span-2"
              placeholder="Dayananda Sagar College of Engineering"
              {...getFieldProps(formik, schema, 'institution')}
            />

            <Input
              label="Field of Study"
              className="col-span-2"
              placeholder="Computer Science &amp; Engineering"
              {...getFieldProps(formik, schema, 'field')}
            />

            <Input
              label="Degree Type"
              placeholder="Bachelor's Degree"
              {...getFieldProps(formik, schema, 'degree')}
            />

            <Input
              label="GPA"
              placeholder="8.8"
              {...getFieldProps(formik, schema, 'gpa')}
            />

            <Input
              type="date"
              label="Start Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, 'startDate')}
            />

            <Input
              type="date"
              label="End Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, 'endDate')}
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

export default memo(EducationModal);
