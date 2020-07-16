import { Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

const CertificateModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t('shared.forms.validation.required')),
    issuer: Yup.string().required(t('shared.forms.validation.required')),
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
          name={t('builder.sections.certification')}
          path="certifications.items"
          event={ModalEvents.CERTIFICATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.title')}
              className="col-span-2"
              placeholder="CCNP"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label={t('builder.certifications.issuer')}
              placeholder="Cisco Systems"
              {...getFieldProps(formik, schema, 'issuer')}
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

export default memo(CertificateModal);
