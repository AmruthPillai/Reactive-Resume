import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DateWrapper: React.FC = ({ children }) => {
  const { locale } = useRouter();

  useEffect(() => {
    dayjs.extend(relativeTime);

    // Locales
    require('dayjs/locale/es');
    require('dayjs/locale/de');
    require('dayjs/locale/hi');
    require('dayjs/locale/kn');
    require('dayjs/locale/ta');

    locale && dayjs.locale(locale);
  }, [locale]);

  return <>{children}</>;
};

export default DateWrapper;
