import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  name: '',
};

const schema = Yup.object().shape({
  name: Yup.string().required('This is a required field.'),
});

const HobbyModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name="Hobby"
          path="hobbies.items"
          event={ModalEvents.HOBBY_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Name"
              placeholder="Fishing"
              className="col-span-2"
              {...getFieldProps(formik, schema, 'name')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default HobbyModal;
