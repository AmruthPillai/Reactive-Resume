import cx from 'classnames';
import React, { memo, useContext } from 'react';
import { MdSync } from 'react-icons/md';
import DatabaseContext from '../../../contexts/DatabaseContext';

const SyncIndicator = () => {
  const { isUpdating } = useContext(DatabaseContext);

  return (
    <div className="text-4xl">
      <MdSync className={cx({ spin: isUpdating })} />
    </div>
  );
};

export default memo(SyncIndicator);
