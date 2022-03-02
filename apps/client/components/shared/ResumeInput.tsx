import { TextField } from '@mui/material';
import get from 'lodash/get';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

import MarkdownSupported from './MarkdownSupported';

interface Props {
  type?: 'text' | 'textarea';
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

  return <TextField type={type} label={label} value={value} onChange={onChange} className={className} />;
};

export default ResumeInput;
