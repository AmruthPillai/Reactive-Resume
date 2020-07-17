import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { hexToRgb } from '../../../utils';

const HeadingC = ({ children }) => {
  const { data } = useContext(PageContext);
  const { r, g, b } = hexToRgb(data.metadata.colors.primary) || {};

  return (
    <h6
      className="py-1 px-4 rounded-r leading-loose font-bold text-xs uppercase tracking-wide mb-3"
      style={{
        marginLeft: '-15px',
        color: data.metadata.colors.background,
        backgroundColor: `rgba(${r - 40}, ${g - 40}, ${b - 40}, 0.8)`,
      }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingC);
