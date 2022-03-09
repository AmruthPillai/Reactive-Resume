import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';

const LocaleWrapper: React.FC = ({ children }) => {
  const router = useRouter();

  const language = useAppSelector((state) => state.build.language);

  useEffect(() => {
    if (!language) return;

    const { code } = language;
    const { pathname, asPath, query, locale } = router;

    document.cookie = `NEXT_LOCALE=${code}; path=/; expires=2147483647`;

    if (locale !== code) {
      router.push({ pathname, query }, asPath, { locale: code });
    }
  }, [router, language]);

  return <>{children}</>;
};

export default LocaleWrapper;
