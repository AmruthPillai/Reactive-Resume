import React from 'react';

const Checkbox = ({ checked, onChange, icon = 'check', size = '2rem' }) => {
  return (
    <div
      className="relative bg-white border-2 rounded border-gray-400 hover:border-gray-500 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 cursor-pointer"
      style={{ width: size, height: size }}
    >
      <input
        type="checkbox"
        style={{ width: size, height: size }}
        className="opacity-0 absolute cursor-pointer z-20"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <i
        className={`absolute material-icons ${
          checked ? 'opacity-100' : 'opacity-0'
        } text-sm text-gray-800`}
      >
        {icon}
      </i>
    </div>
  );
};

export default Checkbox;
