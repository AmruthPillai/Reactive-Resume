import { Field, FieldArray, Formik } from 'formik';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps, handleKeyUp } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  company: '',
  position: '',
  website: 'https://',
  startDate: '',
  endDate: '',
  summary: '',
  highlights: [],
  temp: '',
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
  highlights: Yup.array().of(
    Yup.string().required('This is a required field.'),
  ),
  temp: Yup.string().ensure(),
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

            <FieldArray
              name="highlights"
              render={(arrayHelpers) => {
                const handleClickAdd = () => {
                  formik.values.temp && arrayHelpers.push(formik.values.temp);
                  formik.setFieldValue('temp', '');
                };

                return (
                  <div className="col-span-2">
                    <label>
                      <span>Highlights</span>

                      {formik.values.highlights &&
                        formik.values.highlights.map((x, i) => (
                          <Field key={x} name={`highlights.${i}`}>
                            {({ field, meta }) => (
                              <Input
                                className="my-1"
                                showDeleteItemButton
                                onDeleteItem={() => arrayHelpers.remove(i)}
                                {...field}
                                {...meta}
                              />
                            )}
                          </Field>
                        ))}

                      <div className="flex items-center">
                        <Input
                          placeholder="Worked passionately in customer service in a high volume restaurant."
                          {...getFieldProps(formik, schema, 'temp')}
                        />
                        <MdAdd
                          size="18px"
                          tabIndex="0"
                          className="mx-4 cursor-pointer opacity-50 hover:opacity-75"
                          onKeyUp={(e) => handleKeyUp(e, handleClickAdd)}
                          onClick={handleClickAdd}
                        />
                      </div>
                    </label>
                  </div>
                );
              }}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default WorkModal;
