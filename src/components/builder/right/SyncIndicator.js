import cx from 'classnames';
import React, { memo, useContext } from 'react';
import { MdSync, MdSyncDisabled } from 'react-icons/md';
import DatabaseContext from '../../../contexts/DatabaseContext';

const SyncIndicator = () => {
  const { isOffline, isUpdating } = useContext(DatabaseContext);

  return (
    <div className="text-4xl">
      {isOffline ? (
        <MdSyncDisabled className="text-red-600" />
      ) : (
        <MdSync className={cx({ spin: isUpdating })} />
      )}
    </div>
  );
};

export default memo(SyncIndicator);
