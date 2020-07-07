import cx from "classnames";
import { get } from "lodash";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import ResumeContext from "../../contexts/ResumeContext";
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
  placeholder,
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
        <span>{label}</span>
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
        {touched && <p>{error}</p>}
      </label>
    </div>
  );
};

export default Input;
