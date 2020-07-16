import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
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

const ProjectModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t('shared.forms.validation.required')),
    link: Yup.string().url(t('shared.forms.validation.url')),
    date: Yup.date().max(new Date()),
    summary: Yup.string(),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t('builder.sections.project')}
          path="projects.items"
          event={ModalEvents.PROJECT_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.title')}
              className="col-span-2"
              placeholder="Reactive Resume"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label={t('shared.forms.website')}
              placeholder="https://github.com/AmruthPillai/Reactive-Resume"
              {...getFieldProps(formik, schema, 'link')}
            />

            <Input
              type="date"
              label={t('shared.forms.date')}
              {...getFieldProps(formik, schema, 'date')}
            />

            <Input
              type="textarea"
              label={t('shared.forms.summary')}
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
