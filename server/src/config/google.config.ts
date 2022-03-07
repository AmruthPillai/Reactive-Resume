import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  apiKey: process.env.GOOGLE_API_KEY,
  clientId: process.env.PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
