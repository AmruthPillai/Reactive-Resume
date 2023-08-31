import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { FontsModule } from './fonts/fonts.module';
import { HealthModule } from './health/health.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { MailModule } from './mail/mail.module';
import { PrinterModule } from './printer/printer.module';
import { ResumeModule } from './resume/resume.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/assets',
      rootPath: join(__dirname, 'assets'),
    }),
    ConfigModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    AppModule,
    AuthModule,
    MailModule.register(),
    UsersModule,
    ResumeModule,
    FontsModule,
    IntegrationsModule,
    PrinterModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
