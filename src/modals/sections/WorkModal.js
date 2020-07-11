import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  company: '',
  position: '',
  website: 'https://',
  startDate: '',
  endDate: '',
  summary: '',
};

const schema = Yup.object().shape({
  company: Yup.string().required('This is a required field.'),
  position: Yup.string().required('This is a required field.'),
  website: Yup.string().url('Must be a valid URL'),
  startDate: Yup.date().required('This is a required field.'),
  endDate: Yup.date().when(
    'startDate',
    (startDate, yupSchema) =>
      startDate &&
      yupSchema.min(startDate, 'End Date must be later than Start Date'),
  ),
  summary: Yup.string().min(10, 'Please enter at least 10 characters.'),
});

const WorkModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          path="work.items"
          name="Work Experience"
          event={ModalEvents.WORK_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Company"
              className="col-span-2"
              placeholder="Postdot Technologies Pvt. Ltd."
              {...getFieldProps(formik, schema, 'company')}
            />

            <Input
              label="Position"
              placeholder="Full Stack Web Developer"
              {...getFieldProps(formik, schema, 'position')}
            />

            <Input
              label="Website"
              placeholder="https://example.com/"
              {...getFieldProps(formik, schema, 'website')}
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

export default memo(WorkModal);
