import dayjs from 'dayjs';
import { get, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

export const getModalText = (isEditMode, type) => {
  const { t } = useTranslation();
  return isEditMode
    ? `${t('shared.buttons.edit')} ${type}`
    : `${t('shared.buttons.add')} ${type}`;
};

export const safetyCheck = (section, path = 'items') => {
  return !!(section && section.visible === true && !isEmpty(section[path]));
};

export const handleKeyUp = (event, action) => {
  (event.which === 13 || event.which === 32) && action();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file.type);
};

export const formatDate = ({ date, language = 'en' }) => {
  return dayjs(date).locale(language.substr(0, 2)).format('MMMM YYYY');
};

export const formatDateRange = ({ startDate, endDate, language = 'en' }) => {
  const { t } = useTranslation();
  const start = `${dayjs(startDate)
    .locale(language.substr(0, 2))
    .format('MMMM YYYY')}`;

  const end = dayjs(endDate).isValid()
    ? `${dayjs(endDate).locale(language.substr(0, 2)).format('MMMM YYYY')}`
    : t('shared.forms.present');

  return `${start} - ${end}`;
};

export const getFieldProps = (formik, schema, name) => ({
  touched: get(formik, `touched.${name}`, false),
  error: get(formik, `errors.${name}`, ''),
  isRequired: get(schema, `fields.${name}._exclusive.required`),
  ...formik.getFieldProps(name),
});

export const getUnsplashPhoto = async () => {
  const response = await fetch('https://source.unsplash.com/featured/400x600');
  return response.url;
};

export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
