import React from 'react';

const fontOptions = [
  'Lato',
  'Merriweather',
  'Montserrat',
  'Open Sans',
  'Raleway',
  'Roboto',
  'Rubik',
  'Source Sans Pro',
  'Titillium Web',
  'Ubuntu',
];

const FontsTab = ({ theme, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {fontOptions.map(x => (
        <div
          key={x}
          style={{ fontFamily: x }}
          onClick={() => onChange('theme.font.family', x)}
          className={`w-full rounded border py-4 shadow text-xl text-center ${
            theme.font.family === x ? 'border-gray-500' : 'border-transparent'
          } hover:border-gray-400 cursor-pointer`}
        >
          {x}
        </div>
      ))}
    </div>
  );
};

export default FontsTab;
