import React from 'react';
import MarkdownHelpText from './MarkdownHelpText';

const TextArea = ({ label, placeholder, value, onChange, className, rows = 5 }) => (
  <div className={`w-full flex flex-col ${className}`}>
    <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
      {label}
    </label>
    <textarea
      className="appearance-none block leading-7 w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />

    <MarkdownHelpText className="mt-2" />
  </div>
);

export default TextArea;
