import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';

const DateWrapper: React.FC = ({ children }) => {
  useEffect(() => {
    dayjs.extend(relativeTime);
  }, []);

  return <>{children}</>;
};

export default DateWrapper;
