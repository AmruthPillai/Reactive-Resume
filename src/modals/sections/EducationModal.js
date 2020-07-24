import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
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

const EducationModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    institution: Yup.string().required(t('shared.forms.validation.required')),
    field: Yup.string().required(t('shared.forms.validation.required')),
    degree: Yup.string(),
    gpa: Yup.string(),
    startDate: Yup.date(),
    endDate: Yup.date().when(
      'startDate',
      (startDate, yupSchema) =>
        startDate &&
        yupSchema.min(startDate, t('shared.forms.validation.dateRange')),
    ),
    summary: Yup.string().min(
      10,
      t('shared.forms.validation.min', { number: 10 }),
    ),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t('builder.sections.education')}
          path="education.items"
          event={ModalEvents.EDUCATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('builder.education.institution')}
              className="col-span-2"
              placeholder="Dayananda Sagar College of Engineering"
              {...getFieldProps(formik, schema, 'institution')}
            />

            <Input
              label={t('builder.education.field')}
              className="col-span-2"
              placeholder="Computer Science &amp; Engineering"
              {...getFieldProps(formik, schema, 'field')}
            />

            <Input
              label={t('builder.education.degree')}
              placeholder="Bachelor's Degree"
              {...getFieldProps(formik, schema, 'degree')}
            />

            <Input
              label={t('builder.education.gpa')}
              placeholder="8.8"
              {...getFieldProps(formik, schema, 'gpa')}
            />

            <Input
              type="date"
              label={t('shared.forms.startDate')}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, 'startDate')}
            />

            <Input
              type="date"
              label={t('shared.forms.endDate')}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, 'endDate')}
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

export default memo(EducationModal);
