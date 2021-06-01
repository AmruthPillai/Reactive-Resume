import { MdSync } from 'react-icons/md';
import React, { memo, useContext } from 'react';
import cx from 'classnames';
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
