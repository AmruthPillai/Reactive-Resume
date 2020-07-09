import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const SKILL_LEVELS = [
  'Fundamental Awareness',
  'Novice',
  'Intermediate',
  'Advanced',
  'Expert',
];

const initialValues = {
  name: '',
  level: SKILL_LEVELS[0],
};

const schema = Yup.object().shape({
  name: Yup.string().required('This is a required field.'),
  level: Yup.string()
    .oneOf(SKILL_LEVELS, 'Must be one of the options above.')
    .required('This is a required field.'),
});

const SkillModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Skill"
          path="skills.items"
          event={ModalEvents.SKILL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Name"
              placeholder="ReactJS"
              {...getFieldProps(formik, schema, 'name')}
            />

            <Input
              label="Level"
              type="dropdown"
              options={SKILL_LEVELS}
              {...getFieldProps(formik, schema, 'level')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(SkillModal);
