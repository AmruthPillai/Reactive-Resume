import React from 'react';

const Checkbox = ({ checked, onChange, icon = 'check', size = '2rem' }) => {
  return (
    <div
      className="bg-white border-2 rounded border-gray-400 hover:border-gray-500 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 cursor-pointer"
      style={{ width: size, height: size }}
    >
      <input
        type="checkbox"
        style={{ width: size, height: size }}
        className="opacity-0 absolute cursor-pointer"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <i className="material-icons fill-current hidden text-sm font-bold text-gray-800 cursor-pointer">
        {icon}
      </i>
    </div>
  );
};

export default Checkbox;
