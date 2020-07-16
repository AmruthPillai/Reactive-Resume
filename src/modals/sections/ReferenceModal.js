import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  name: '',
  position: '',
  phone: '',
  email: '',
  summary: '',
};

const ReferenceModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t('shared.forms.validation.required')),
    position: Yup.string().required(t('shared.forms.validation.required')),
    phone: Yup.string(),
    email: Yup.string().email(t('shared.forms.validation.email')),
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
          name={t('builder.sections.reference')}
          path="references.items"
          event={ModalEvents.REFERENCE_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.name')}
              placeholder="Jane Doe"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              label={t('shared.forms.position')}
              placeholder="Assistant Manager"
              {...getFieldProps(formik, schema, 'position')}
            />

            <Input
              label={t('shared.forms.phone')}
              placeholder="+1 (708) 756-6065"
              {...getFieldProps(formik, schema, 'phone')}
            />

            <Input
              label={t('shared.forms.email')}
              placeholder="janedoe@example.com"
              {...getFieldProps(formik, schema, 'email')}
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

export default memo(ReferenceModal);
