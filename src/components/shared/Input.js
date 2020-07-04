import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Input.module.css";

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  const uuid = uuidv4();

  return (
    <div className={styles.container}>
      <label htmlFor={uuid}>
        <span>{label}</span>
        <input
          id={uuid}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default Input;
