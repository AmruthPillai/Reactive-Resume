import cx from 'classnames';
import { isFunction } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { MdOpenInNew } from 'react-icons/md';
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
  onClick,
  onChange,
  className,
  isRequired,
  placeholder,
  type = 'text',
}) => {
  const { t } = useTranslation();
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
    <div className={className}>
      <label htmlFor={uuid}>
        <span>
          {label}{' '}
          {isRequired && (
            <span className="opacity-75 font-normal lowercase">
              ({t('shared.forms.required')})
            </span>
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
              <Trans t={t} i18nKey="shared.forms.markdown">
                A
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  className="text-blue-600"
                  target="blank"
                >
                  B
                </a>
                C
              </Trans>
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
                <option key={x} value={x}>
                  {x}
                </option>
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

        {type === 'action' && (
          <div className={cx('relative grid items-center', styles.readOnly)}>
            <input readOnly id={uuid} name={name} type="text" value={value} />

            <div
              tabIndex="0"
              role="button"
              onClick={onClick}
              onKeyUp={(e) => handleKeyUp(e, onClick)}
            >
              <MdOpenInNew size="16px" />
            </div>
          </div>
        )}

        {error && touched && <p>{error}</p>}
      </label>
    </div>
  );
};

export default memo(Input);
