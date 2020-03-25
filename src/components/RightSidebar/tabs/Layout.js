import React from 'react';
import Onyx, { Image as OnyxPreview } from '../../../templates/onyx';

const layouts = [
  {
    name: 'Onyx',
    component: Onyx,
    preview: OnyxPreview,
  },
];

const LayoutTab = ({ theme }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {layouts.map(x => (
        <div key={x.name} className="text-center">
          <img
            className={`rounded cursor-pointer object-cover border shadow hover:shadow-md ${
              theme.layout === x.name ? 'border-gray-500' : 'border-transparent '
            } hover:border-gray-400 cursor-pointer`}
            src={x.preview}
            alt={x.name}
          />
          <p className="mt-1 text-sm font-medium">{x.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LayoutTab;
