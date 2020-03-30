import React from 'react';

const Dropdown = ({ label, value, onChange, options, optionItem }) => (
  <div className="flex flex-col mb-2">
    {label && (
      <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
        {label}
      </label>
    )}
    <div className="inline-flex relative w-full bg-gray-200 text-gray-800 rounded py-3 px-4 leading-tight focus:outline-none">
      <select
        className="block appearance-none w-full bg-gray-200 text-gray-800 focus:outline-none"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(optionItem)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex justify-center items-center px-2 bg-gray-200">
        <i className="material-icons">expand_more</i>
      </div>
    </div>
  </div>
);

export default Dropdown;
