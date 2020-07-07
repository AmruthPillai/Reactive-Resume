import { isEmpty } from "lodash";
import React from "react";
import { MdAdd } from "react-icons/md";
import Button from "../../shared/Button";
import EmptyList from "./EmptyList";
import styles from "./List.module.css";

const List = ({ items, onAdd, children }) => {
  return (
    <div className="flex flex-col">
      <div className={styles.container}>
        {isEmpty(items) ? <EmptyList /> : children}
      </div>

      <Button
        outline
        icon={MdAdd}
        title="Add New"
        onClick={onAdd}
        className="mt-8 ml-auto"
      />
    </div>
  );
};

export default List;
