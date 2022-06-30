import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  bucket: process.env.STORAGE_BUCKET,
  region: process.env.STORAGE_REGION,
  endpoint: process.env.STORAGE_ENDPOINT,
  urlPrefix: process.env.STORAGE_URL_PREFIX,
  accessKey: process.env.STORAGE_ACCESS_KEY,
  secretKey: process.env.STORAGE_SECRET_KEY,
}));
