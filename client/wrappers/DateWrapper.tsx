import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';

const DateWrapper: React.FC = ({ children }) => {
  useEffect(() => {
    dayjs.extend(relativeTime);

    // Locales
    require('dayjs/locale/kn');
  }, []);

  return <>{children}</>;
};

export default DateWrapper;
