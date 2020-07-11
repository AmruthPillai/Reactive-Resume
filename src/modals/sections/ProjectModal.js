import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  title: '',
  link: '',
  date: '',
  summary: '',
};

const schema = Yup.object().shape({
  title: Yup.string().required('This is a required field.'),
  link: Yup.string().url('Must be a valid URL'),
  date: Yup.date().max(new Date()),
  summary: Yup.string(),
});

const ProjectModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Project"
          path="projects.items"
          event={ModalEvents.PROJECT_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Title"
              className="col-span-2"
              placeholder="Reactive Resume"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label="Link"
              placeholder="https://github.com/AmruthPillai/Reactive-Resume"
              {...getFieldProps(formik, schema, 'link')}
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

export default memo(ProjectModal);
