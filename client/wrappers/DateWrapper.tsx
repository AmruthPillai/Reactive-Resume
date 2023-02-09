import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DateWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const { locale } = useRouter();

  useEffect(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);

    // Locales
    require('dayjs/locale/am');
    require('dayjs/locale/ar');
    require('dayjs/locale/bg');
    require('dayjs/locale/bn');
    require('dayjs/locale/ca');
    require('dayjs/locale/cs');
    require('dayjs/locale/da');
    require('dayjs/locale/de');
    require('dayjs/locale/el');
    require('dayjs/locale/en');
    require('dayjs/locale/es');
    require('dayjs/locale/fa');
    require('dayjs/locale/fi');
    require('dayjs/locale/fr');
    require('dayjs/locale/he');
    require('dayjs/locale/hi');
    require('dayjs/locale/hu');
    require('dayjs/locale/id');
    require('dayjs/locale/it');
    require('dayjs/locale/ja');
    require('dayjs/locale/km');
    require('dayjs/locale/kn');
    require('dayjs/locale/ko');
    require('dayjs/locale/ml');
    require('dayjs/locale/mr');
    require('dayjs/locale/ne');
    require('dayjs/locale/nl');
    require('dayjs/locale/nb'); // no -> nb
    require('dayjs/locale/pl');
    require('dayjs/locale/pt');
    require('dayjs/locale/ro');
    require('dayjs/locale/ru');
    require('dayjs/locale/sr');
    require('dayjs/locale/sv');
    require('dayjs/locale/ta');
    require('dayjs/locale/tr');
    require('dayjs/locale/uk');
    require('dayjs/locale/vi');
    require('dayjs/locale/zh');

    if (locale) {
      if (locale === 'no') dayjs.locale('nb');
      else dayjs.locale(locale);
    }
  }, [locale]);

  return <>{children}</>;
};

export default DateWrapper;
