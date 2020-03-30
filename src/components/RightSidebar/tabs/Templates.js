import React from 'react';

import templates from '../../../templates';

const TemplatesTab = ({ theme, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {templates.map(x => (
        <div key={x.key} className="text-center" onClick={() => onChange('theme.layout', x.key)}>
          <img
            className={`rounded cursor-pointer object-cover border shadow hover:shadow-md ${
              theme.layout.toLowerCase() === x.key
                ? 'border-gray-600 hover:border-gray-600'
                : 'border-transparent '
            } hover:border-gray-500 cursor-pointer`}
            src={x.preview}
            alt={x.name}
          />
          <p className="mt-1 text-sm font-medium">{x.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplatesTab;
