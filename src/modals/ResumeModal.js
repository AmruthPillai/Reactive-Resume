import { Formik } from 'formik';
import React, { memo, useContext } from 'react';
import * as Yup from 'yup';
import Input from '../components/shared/Input';
import ModalEvents from '../constants/ModalEvents';
import DatabaseContext from '../contexts/DatabaseContext';
import { getFieldProps } from '../utils';
import DataModal from './DataModal';
import leftSections from '../data/leftSections';

const initialValues = {
  name: '',
  metadata: {
    template: 'onyx',
    font: 'Montserrat',
    layout: [leftSections.map(({ id, name }) => ({ id, name }))],
    colors: {
      text: '#444444',
      primary: '#5875DB',
      background: '#FFFFFF',
    },
  },
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Please enter at least 5 characters.')
    .required('This is a required field.'),
});

const ResumeModal = () => {
  const { createResume, updateResume } = useContext(DatabaseContext);

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Resume"
          title={{
            create: 'Create Resume',
            edit: 'Edit Resume',
          }}
          onEdit={updateResume}
          onCreate={createResume}
          event={ModalEvents.CREATE_RESUME_MODAL}
        >
          <Input
            label="Name"
            className="mb-8"
            placeholder="Full Stack Web Developer"
            {...getFieldProps(formik, schema, 'name')}
          />

          <p className="leading-loose">
            You are going to be creating a new resume from scratch, but first,
            let&apos;s give it a name. This can be the name of the role you want
            to apply for, or if you&apos;re making a resume for a friend, you
            could call it Alex&apos;s Resume.
          </p>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(ResumeModal);
