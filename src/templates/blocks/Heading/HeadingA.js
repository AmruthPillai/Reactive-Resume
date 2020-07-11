import React, { useContext, memo } from 'react';
import PageContext from '../../../contexts/PageContext';

const HeadingA = ({ children }) => {
  const { data } = useContext(PageContext);

  return (
    <h6
      className="text-xs font-bold uppercase mt-4 mb-1"
      style={{ color: data.metadata.colors.primary }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingA);
