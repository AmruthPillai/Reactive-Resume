import { Field, FieldArray, Formik } from 'formik';
import { get } from 'lodash';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import * as Yup from 'yup';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { handleKeyDown } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  institution: '',
  field: '',
  degree: '',
  gpa: '',
  startDate: '',
  endDate: '',
  courses: [],
  temp: '',
};

const validationSchema = Yup.object().shape({
  institution: Yup.string().required('This is a required field.'),
  field: Yup.string().required('This is a required field.'),
  degree: Yup.string(),
  gpa: Yup.string(),
  startDate: Yup.date().required('This is a required field.'),
  endDate: Yup.date().when(
    'startDate',
    (startDate, schema) =>
      startDate &&
      schema.min(startDate, 'End Date must be later than Start Date'),
  ),
  courses: Yup.array().of(Yup.string().required('This is a required field.')),
  temp: Yup.string().ensure(),
});

const EducationModal = () => {
  const getFieldProps = (formik, name) => ({
    touched: get(formik, `touched.${name}`, false),
    error: get(formik, `errors.${name}`, ''),
    isRequired: get(validationSchema, `fields.${name}._exclusive.required`),
    ...formik.getFieldProps(name),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <DataModal
          name="Education"
          path="education.items"
          event={ModalEvents.EDUCATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Institution"
              className="col-span-2"
              placeholder="Dayananda Sagar College of Engineering"
              {...getFieldProps(formik, 'institution')}
            />

            <Input
              label="Field of Study"
              className="col-span-2"
              placeholder="Computer Science &amp; Engineering"
              {...getFieldProps(formik, 'field')}
            />

            <Input
              label="Degree Type"
              placeholder="Bachelor's Degree"
              {...getFieldProps(formik, 'degree')}
            />

            <Input
              label="GPA"
              placeholder="8.8"
              {...getFieldProps(formik, 'gpa')}
            />

            <Input
              type="date"
              label="Start Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, 'startDate')}
            />

            <Input
              type="date"
              label="End Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, 'endDate')}
            />

            <FieldArray
              name="courses"
              render={(arrayHelpers) => {
                const handleClickAdd = () => {
                  formik.values.temp && arrayHelpers.push(formik.values.temp);
                  formik.setFieldValue('temp', '');
                };

                return (
                  <div className="col-span-2">
                    <label>
                      <span>Courses</span>

                      {formik.values.courses &&
                        formik.values.courses.map((x, i) => (
                          <Field key={x} name={`courses.${i}`}>
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
                          placeholder="Algorithms &amp; Data Structures"
                          {...getFieldProps(formik, 'temp')}
                        />
                        <MdAdd
                          size="18px"
                          tabIndex="0"
                          className="mx-4 cursor-pointer opacity-50 hover:opacity-75"
                          onKeyDown={(e) => handleKeyDown(e, handleClickAdd)}
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

export default EducationModal;
