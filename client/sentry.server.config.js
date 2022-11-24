import env from '@beam-australia/react-env';
import * as Sentry from '@sentry/nextjs';

const sentryDSN =
  env('CLIENT_SENTRY_DSN') ||
  'https://aceffdbdaa544768bc85216e7c6a9c50@o4504211187564544.ingest.sentry.io/4504213380071424';

Sentry.init({
  dsn: sentryDSN,
  tracesSampleRate: 1.0,
});
