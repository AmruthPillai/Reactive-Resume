import React from 'react';
import TextField from '../../../shared/TextField';

const fontOptions = [
  'Lato',
  'Montserrat',
  'Nunito',
  'Open Sans',
  'Raleway',
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

      <TextField
        label="Font Family"
        placeholder="Avenir Next"
        value={theme.font.family}
        onChange={v => onChange('theme.font.family', v)}
      />
      <p className="text-gray-600 text-sm">
        You can use any font that is installed on your system as well. Just enter the name of the
        font family here and the browser would load it up for you.
      </p>
    </div>
  );
};

export default FontsTab;
