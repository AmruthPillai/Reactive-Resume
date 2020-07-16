import React, { memo } from 'react';

const Heading = ({ children }) => {
  return <h2 className="text-4xl focus:outline-none">{children}</h2>;
};

export default memo(Heading);
