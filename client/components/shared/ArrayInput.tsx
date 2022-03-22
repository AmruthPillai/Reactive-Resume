import { Add, Delete } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './ArrayInput.module.scss';

type Props = {
  label: string;
  value?: string[];
  className?: string;
  onChange: (event: any) => void;
  errors?: FieldError | FieldError[];
};

const ArrayInput: React.FC<Props> = ({ value, label, onChange, errors, className }) => {
  const [items, setItems] = useState<string[]>(value || []);

  const onAdd = () => setItems([...items, '']);

  const onDelete = (index: number) => setItems(items.filter((_, idx) => idx !== index));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempItems = [...items];
    tempItems[index] = event.target.value;
    setItems(tempItems);
  };

  useEffect(() => {
    onChange(items);
  }, [onChange, items]);

  return (
    <div className={className}>
      <header className={styles.header}>
        <h3 className={styles.label}>
          {label} <small>({items.length})</small>
        </h3>

        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </header>

      <div className={styles.inputGrid}>
        {items.map((value, index) => (
          <TextField
            key={index}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
            error={!!get(errors, index, false)}
            helperText={get(errors, `${index}.message`, '')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => onDelete(index)} className={styles.delete}>
                    <Delete />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayInput;
