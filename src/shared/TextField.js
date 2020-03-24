import React from 'react';

const TextField = ({ label, placeholder, value, onChange }) => (
  <div className="my-4 w-full flex flex-col">
    <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
      {label}
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default TextField;
