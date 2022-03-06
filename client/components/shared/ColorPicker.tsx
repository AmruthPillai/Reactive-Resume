import { Popover, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { hexColorPattern } from '@/config/colors';

import ColorAvatar from './ColorAvatar';

type Props = {
  label: string;
  color: string;
  className?: string;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<Props> = ({ label, color, onChange, className }) => {
  const isValid = useMemo(() => hexColorPattern.test(color), [color]);

  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hexColorPattern.test(event.target.value)) {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <TextField
        label={label}
        value={color}
        error={!isValid}
        onClick={handleOpen}
        onChange={handleChange}
        className={className}
        InputProps={{
          startAdornment: (
            <div className="mr-2">
              <ColorAvatar color={color} />
            </div>
          ),
        }}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <HexColorPicker color={color} onChange={onChange} className="overflow-hidden" />
      </Popover>
    </>
  );
};

export default ColorPicker;
