import React, { memo } from 'react';

const HeadingC = ({ children }) => {
  return (
    <h6 className="font-bold text-xs uppercase tracking-wide mb-1">
      {children}
    </h6>
  );
};

export default memo(HeadingC);
