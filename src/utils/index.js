import { get } from 'lodash';
import moment from 'moment';

export const getModalText = (isEditMode, type) => {
  return isEditMode ? `Edit ${type}` : `Add ${type}`;
};

export const transformCollectionSnapshot = (snapshot, setData) => {
  const data = [];
  snapshot.forEach((doc) => data.push(doc.data()));
  setData(data);
};

export const handleKeyUp = (event, action) => {
  (event.which === 13 || event.which === 32) && action();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file.type);
};

export const formatDateRange = (x) =>
  `${moment(x.startDate).format('MMMM Y')} — ${
    moment(x.endDate).isValid() ? moment(x.endDate).format('MMMM Y') : 'Present'
  }`;

export const getFieldProps = (formik, schema, name) => ({
  touched: get(formik, `touched.${name}`, false),
  error: get(formik, `errors.${name}`, ''),
  isRequired: get(schema, `fields.${name}._exclusive.required`),
  ...formik.getFieldProps(name),
});
