import React from 'react';
import Onyx, { Image as OnyxPreview } from '../../../templates/onyx';
import Pikachu, { Image as PikachuPreview } from '../../../templates/pikachu';
import Gengar, { Image as GengarPreview } from '../../../templates/gengar';

const templates = [
  {
    name: 'Onyx',
    component: Onyx,
    preview: OnyxPreview,
  },
  {
    name: 'Pikachu',
    component: Pikachu,
    preview: PikachuPreview,
  },
  {
    name: 'Gengar',
    component: Gengar,
    preview: GengarPreview,
  },
];

const TemplatesTab = ({ theme, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {templates.map(x => (
        <div key={x.name} className="text-center" onClick={() => onChange('theme.layout', x.name)}>
          <img
            className={`rounded cursor-pointer object-cover border shadow hover:shadow-md ${
              theme.layout === x.name
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
