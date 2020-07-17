import { Formik } from 'formik';
import React, { memo, useContext } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '../components/shared/Input';
import ModalEvents from '../constants/ModalEvents';
import DatabaseContext from '../contexts/DatabaseContext';
import { getFieldProps } from '../utils';
import DataModal from './DataModal';

const initialValues = {
  name: '',
};

const ResumeModal = () => {
  const { t } = useTranslation();
  const { createResume, updateResume } = useContext(DatabaseContext);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(5, t('shared.forms.validation.min', { number: 5 }))
      .required(t('shared.forms.validation.required')),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          title={{
            create: t('dashboard.createResume'),
            edit: t('dashboard.editResume'),
          }}
          onEdit={updateResume}
          onCreate={createResume}
          event={ModalEvents.CREATE_RESUME_MODAL}
        >
          <Input
            label={t('shared.forms.name')}
            className="mb-8"
            placeholder="Full Stack Web Developer"
            {...getFieldProps(formik, schema, 'name')}
          />

          <p className="leading-loose">{t('dashboard.helpText')}</p>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(ResumeModal);
