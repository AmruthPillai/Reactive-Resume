import env from '@beam-australia/react-env';
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = env('CLIENT_SENTRY_DSN');

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    enabled: process.env.NODE_ENV === 'production',
  });
}
