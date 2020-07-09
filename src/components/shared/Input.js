import cx from 'classnames';
import { isFunction } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../contexts/ResumeContext';
import { handleKeyUp } from '../../utils';
import styles from './Input.module.css';

const Input = ({
  name,
  path,
  label,
  error,
  value,
  onBlur,
  options,
  touched,
  onChange,
  className,
  isRequired,
  placeholder,
  onDeleteItem,
  showDeleteItemButton,
  type = 'text',
}) => {
  const [uuid, setUuid] = useState(null);
  const stateValue = useSelector(path, '');
  const dispatch = useDispatch();

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  value = path ? stateValue : value;
  onChange = isFunction(onChange)
    ? onChange
    : (e) => {
        dispatch({
          type: 'on_input',
          payload: {
            path,
            value: e.target.value,
          },
        });
      };

  return (
    <div className={cx(styles.container, className)}>
      <label htmlFor={uuid}>
        <span>
          {label}{' '}
          {isRequired && (
            <span className="opacity-75 font-normal lowercase">(Required)</span>
          )}
        </span>

        {(type === 'text' || type === 'date') && (
          <div className="relative grid items-center">
            <input
              id={uuid}
              name={name}
              type={type}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
            />

            {showDeleteItemButton && isFunction(onDeleteItem) && (
              <MdClose
                size="16px"
                tabIndex="0"
                onClick={onDeleteItem}
                onKeyUp={(e) => handleKeyUp(e, onDeleteItem)}
                className="absolute right-0 cursor-pointer opacity-50 hover:opacity-75 mx-4"
              />
            )}
          </div>
        )}

        {type === 'textarea' && (
          <div className="flex flex-col">
            <textarea
              id={uuid}
              rows="4"
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
            />

            <p className="mt-2 text-sm opacity-75">
              This text block supports{' '}
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                className="text-blue-600"
                target="blank"
              >
                markdown
              </a>
              .
            </p>
          </div>
        )}

        {type === 'dropdown' && (
          <div className="relative grid items-center">
            <select
              id={uuid}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            >
              {options.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>

            <FaAngleDown
              size="16px"
              className="absolute right-0 opacity-50 hover:opacity-75 mx-4"
            />
          </div>
        )}

        {type === 'color' && (
          <div className="relative grid items-center">
            <div className={styles.circle} style={{ backgroundColor: value }} />

            <input
              id={uuid}
              name={name}
              type="text"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        )}

        {error && touched && <p>{error}</p>}
      </label>
    </div>
  );
};

export default memo(Input);
