import cx from "classnames";
import { get, isFunction } from "lodash";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import ResumeContext from "../../contexts/ResumeContext";
import { handleKeyDown } from "../../utils";
import styles from "./Input.module.css";

const Input = ({
  name,
  path,
  label,
  value,
  error,
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
  const { state, dispatch } = useContext(ResumeContext);

  const inputProps = (path) => ({
    value: get(state, path) || "",
    onChange: (e) => {
      dispatch({
        type: "on_input",
        payload: {
          path,
          value: e.target.value,
        },
      });
    },
  });

  return (
    <div className={cx(styles.container, className)}>
      <label htmlFor={uuid}>
        <span>
          {label}{" "}
          {isRequired && (
            <span className="opacity-75 font-normal lowercase">(Required)</span>
          )}
        </span>

        {type === "textarea" ? (
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
              {...(path && inputProps(path))}
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
        ) : (
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
              {...(path && inputProps(path))}
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
        {error && touched && <p>{error}</p>}
      </label>
    </div>
  );
};

export default Input;
