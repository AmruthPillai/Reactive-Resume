import cx from "classnames";
import { get, isFunction } from "lodash";
import React, { useMemo } from "react";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "../../contexts/ResumeContext";
import { handleKeyDown } from "../../utils";
import styles from "./Input.module.css";

const Input = ({
  name,
  path,
  label,
  error,
  value,
  onBlur,
  touched,
  checked,
  onChange,
  className,
  isRequired,
  placeholder,
  onDeleteItem,
  showDeleteItemButton,
  type = "text",
}) => {
  const uuid = uuidv4();
  const stateValue = useSelector((state) => get(state, path));
  const dispatch = useDispatch();

  value = value || stateValue;
  onChange = isFunction(onChange)
    ? onChange
    : (e) => {
        dispatch({
          type: "on_input",
          payload: {
            path,
            value: e.target.value,
          },
        });
      };

  return useMemo(
    () => (
      <div className={cx(styles.container, className)}>
        <label htmlFor={uuid}>
          <span>
            {label}{" "}
            {isRequired && (
              <span className="opacity-75 font-normal lowercase">
                (Required)
              </span>
            )}
          </span>

          {type === "text" && (
            <div className="relative grid items-center">
              <input
                id={uuid}
                name={name}
                type={type}
                value={value}
                onBlur={onBlur}
                checked={checked}
                onChange={onChange}
                placeholder={placeholder}
              />

              {showDeleteItemButton && isFunction(onDeleteItem) && (
                <MdClose
                  size="16px"
                  tabIndex="0"
                  onClick={onDeleteItem}
                  onKeyDown={(e) => handleKeyDown(e, onDeleteItem)}
                  className="absolute right-0 cursor-pointer opacity-50 hover:opacity-75 mx-4"
                />
              )}
            </div>
          )}

          {type === "textarea" && (
            <div className="flex flex-col">
              <textarea
                id={uuid}
                rows="4"
                name={name}
                type={type}
                value={value}
                onBlur={onBlur}
                checked={checked}
                onChange={onChange}
                placeholder={placeholder}
              />

              <p className="mt-2 text-sm opacity-75">
                This text block supports{" "}
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

          {error && touched && <p>{error}</p>}
        </label>
      </div>
    ),
    [
      checked,
      className,
      error,
      isRequired,
      label,
      name,
      onBlur,
      onChange,
      onDeleteItem,
      placeholder,
      showDeleteItemButton,
      touched,
      type,
      uuid,
      value,
    ]
  );
};

export default Input;
