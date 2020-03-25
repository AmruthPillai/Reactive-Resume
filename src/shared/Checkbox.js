import React from 'react';

const Checkbox = ({ checked, onChange }) => {
  return (
    <div className="bg-white border-2 rounded border-gray-400 hover:border-gray-500 w-8 h-8 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 cursor-pointer">
      <input
        type="checkbox"
        className="w-8 h-8 opacity-0 absolute cursor-pointer"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <i className="material-icons fill-current hidden text-lg font-bold text-gray-800 cursor-pointer">
        check
      </i>
    </div>
  );
};

export default Checkbox;
