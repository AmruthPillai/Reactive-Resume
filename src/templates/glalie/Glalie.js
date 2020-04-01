import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const Glalie = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-4 bg-gray-200 py-10 px-5">Hello</div>
        <div className="col-span-8 py-10 px-5">World</div>
      </div>
    </div>
  );
};

export default Glalie;
