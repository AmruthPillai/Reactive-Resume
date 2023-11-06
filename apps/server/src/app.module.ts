import { HttpException, Module } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { RavenInterceptor, RavenModule } from "nest-raven";
import { ZodValidationPipe } from "nestjs-zod";
import { join } from "path";

import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { MailModule } from "./mail/mail.module";
import { PrinterModule } from "./printer/printer.module";
import { ResumeModule } from "./resume/resume.module";
import { StorageModule } from "./storage/storage.module";
import { UserModule } from "./user/user.module";
import { UtilsModule } from "./utils/utils.module";

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    DatabaseModule,
    MailModule,
    RavenModule,
    CacheModule,
    UtilsModule,
    HealthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
      exclude: ["/api*", "/docs*"],
    }),

    // Feature Modules
    AuthModule.register(),
    UserModule,
    ResumeModule,
    StorageModule,
    PrinterModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          // Filter all HttpException with status code <= 500
          {
            type: HttpException,
            filter: (exception: HttpException) => exception.getStatus() < 500,
          },
        ],
      }),
    },
  ],
})
export class AppModule {}
