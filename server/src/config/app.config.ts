import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  timezone: process.env.TZ,
  environment: process.env.NODE_ENV,
  secretKey: process.env.SECRET_KEY,
  port: parseInt(process.env.PORT, 10) || 9100,
  url: process.env.PUBLIC_URL || 'http://localhost:9000/',
  serverUrl: process.env.PUBLIC_SERVER_URL || 'http://localhost:9100/',
}));
