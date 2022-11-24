import env from '@beam-australia/react-env';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: env('CLIENT_SENTRY_DSN'),
  tracesSampleRate: 1.0,
});
