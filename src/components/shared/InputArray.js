import { Field } from 'formik';
import React, { memo } from 'react';
import { MdAdd } from 'react-icons/md';
import { getFieldProps, handleKeyUp } from '../../utils';
import Input from './Input';

const InputArray = ({ formik, schema, helpers, label, path, placeholder }) => {
  const handleClickAdd = () => {
    formik.values.temp && helpers.push(formik.values.temp);
    formik.setFieldValue('temp', '');
  };

  return (
    <div className="col-span-2">
      <label>
        <span>{label}</span>

        {formik.values[path] &&
          formik.values[path].map((x, i) => (
            <Field key={i} name={`${path}.${i}`}>
              {({ field, meta }) => (
                <Input
                  className="my-1"
                  showDeleteItemButton
                  onDeleteItem={() => helpers.remove(i)}
                  {...field}
                  {...meta}
                />
              )}
            </Field>
          ))}

        <div className="flex items-center">
          <Input
            placeholder={placeholder}
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
};

export default memo(InputArray);
