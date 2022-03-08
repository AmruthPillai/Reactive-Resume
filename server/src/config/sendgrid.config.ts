import { registerAs } from '@nestjs/config';

export default registerAs('sendgrid', () => ({
  apiKey: process.env.SENDGRID_API_KEY,
  forgotPasswordTemplateId: process.env.SENDGRID_FORGOT_PASSWORD_TEMPLATE_ID,
  fromName: process.env.SENDGRID_FROM_NAME,
  fromEmail: process.env.SENDGRID_FROM_EMAIL,
}));
