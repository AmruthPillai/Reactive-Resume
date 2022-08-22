import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  from: {
    name: process.env.MAIL_FROM_NAME,
    email: process.env.MAIL_FROM_EMAIL,
  },
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
}));
