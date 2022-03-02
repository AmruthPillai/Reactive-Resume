import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Middleware
  app.enableCors({ credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Email Templates
  app.setBaseViewsDir(join(__dirname, 'mail/templates'));
  app.setViewEngine('hbs');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  await app.listen(port);
  Logger.log(`🚀 Server is running on: http://localhost:${port}/${globalPrefix}`);
};

bootstrap();
