import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DateWrapper: React.FC = ({ children }) => {
  const { locale } = useRouter();

  useEffect(() => {
    dayjs.extend(relativeTime);

    // Locales
    require('dayjs/locale/kn');

    locale && dayjs.locale(locale);
  }, [locale]);

  return <>{children}</>;
};

export default DateWrapper;
