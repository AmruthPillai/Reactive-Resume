import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';
import mailConfig from './mail.config';

const validationSchema = Joi.object({
  // App
  TZ: Joi.string().default('UTC'),
  PORT: Joi.number().default(3100),
  SECRET_KEY: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),

  // URLs
  APP_URL: Joi.string().default('http://localhost:3000'),
  SERVER_URL: Joi.string().default('http://localhost:3100'),

  // Database
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),

  // Auth
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY_TIME: Joi.number().required(),

  // Google
  GOOGLE_API_KEY: Joi.string().allow(''),

  // Mail
  MAIL_HOST: Joi.string().allow(''),
  MAIL_PORT: Joi.number().default(465),
  MAIL_USERNAME: Joi.string().allow(''),
  MAIL_PASSWORD: Joi.string().allow(''),
});

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig, authConfig, databaseConfig, googleConfig, mailConfig],
      validationSchema: validationSchema,
    }),
  ],
})
export class ConfigModule {}
