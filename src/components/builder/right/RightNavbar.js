import cx from "classnames";
import React, { useContext } from "react";
import { MdPerson, MdSync, MdSyncDisabled } from "react-icons/md";
import DatabaseContext from "../../../contexts/DatabaseContext";
import styles from "./RightNavbar.module.css";

const RightNavbar = () => {
  const { isOffline, isUpdating } = useContext(DatabaseContext);

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-6">
        <MdPerson
          className="text-secondary-dark hover:text-primary"
          size="20px"
        />
      </div>

      <div className="text-4xl mt-auto">
        {isOffline ? (
          <MdSyncDisabled className="text-red-600" />
        ) : (
          <MdSync className={cx({ spin: isUpdating })} />
        )}
      </div>
    </div>
  );
};

export default RightNavbar;
