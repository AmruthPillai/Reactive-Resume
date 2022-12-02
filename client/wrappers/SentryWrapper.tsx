import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';

const SentryWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const sentryUser: Sentry.User | null = user && { ...user, id: user?.id.toString() };
    Sentry.setUser(sentryUser);
  }, [user]);

  return <>{children}</>;
};

export default SentryWrapper;
