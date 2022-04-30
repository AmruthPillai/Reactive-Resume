import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import get from 'lodash/get';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

import MarkdownSupported from './MarkdownSupported';

interface Props {
  type?: 'text' | 'textarea' | 'date';
  label: string;
  path: string;
  className?: string;
  markdownSupported?: boolean;
}

const ResumeInput: React.FC<Props> = ({ type = 'text', label, path, className, markdownSupported = false }) => {
  const dispatch = useAppDispatch();

  const stateValue = useAppSelector((state) => get(state.resume, path, ''));

  useEffect(() => {
    setValue(stateValue);
  }, [stateValue]);

  const [value, setValue] = useState<string>(stateValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
    dispatch(setResumeState({ path, value: event.target.value }));
  };

  const onChangeValue = (value: string) => {
    setValue(value);
    dispatch(setResumeState({ path, value }));
  };

  if (type === 'textarea') {
    return (
      <TextField
        rows={5}
        multiline
        label={label}
        value={value}
        onChange={onChange}
        className={className}
        helperText={markdownSupported && <MarkdownSupported />}
      />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker
        openTo="year"
        label={label}
        value={value}
        views={['year', 'month', 'day']}
        renderInput={(params) => <TextField {...params} error={false} className={className} />}
        onChange={(date: Date | null, keyboardInputValue: string | undefined) => {
          isEmpty(keyboardInputValue) && onChangeValue('');
          date && dayjs(date).isValid() && onChangeValue(date.toISOString());
        }}
      />
    );
  }

  return <TextField type={type} label={label} value={value} onChange={onChange} className={className} />;
};

export default ResumeInput;
