import React, { memo } from 'react';

const HeadingC = ({ children }) => {
  return (
    <h6 className="my-2 text-md uppercase font-semibold tracking-wider pb-1 border-b-2 border-gray-800">
      {children}
    </h6>
  );
};

export default memo(HeadingC);
