import env from '@beam-australia/react-env';
import * as Sentry from '@sentry/nextjs';

import packageJSON from '../package.json';

const SENTRY_DSN = env('CLIENT_SENTRY_DSN');

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    release: packageJSON.version,
    enabled: process.env.NODE_ENV === 'production',
  });
}
