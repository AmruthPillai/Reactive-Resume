import { registerAs } from '@nestjs/config';

export default registerAs('logging', () => ({
  sentryDSN: process.env.SERVER_SENTRY_DSN,
}));
