import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DateWrapper: React.FC = ({ children }) => {
  const { locale } = useRouter();

  useEffect(() => {
    dayjs.extend(relativeTime);

    // Locales
    require('dayjs/locale/ar');
    require('dayjs/locale/bn');
    require('dayjs/locale/da');
    require('dayjs/locale/de');
    require('dayjs/locale/en');
    require('dayjs/locale/es');
    require('dayjs/locale/fr');
    require('dayjs/locale/hi');
    require('dayjs/locale/it');
    require('dayjs/locale/kn');
    require('dayjs/locale/ml');
    require('dayjs/locale/nl');
    require('dayjs/locale/pl');
    require('dayjs/locale/ru');
    require('dayjs/locale/ta');
    require('dayjs/locale/tr');
    require('dayjs/locale/vi');
    require('dayjs/locale/zh');

    locale && dayjs.locale(locale);
  }, [locale]);

  return <>{children}</>;
};

export default DateWrapper;
