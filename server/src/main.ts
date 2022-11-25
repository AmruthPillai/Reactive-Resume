import '@sentry/tracing';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Middleware
  app.enableCors({ credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Sentry Error Logging
  const sentryDSN = configService.get<string>('logging.sentryDSN');
  if (sentryDSN) {
    Sentry.init({
      dsn: sentryDSN,
      tracesSampleRate: 1.0,
      enabled: process.env.NODE_ENV === 'production',
    });
  }

  // Server Port
  const port = configService.get<number>('app.port');
  await app.listen(port);

  Logger.log(`🚀 Server is up and running!`);
};

bootstrap();
