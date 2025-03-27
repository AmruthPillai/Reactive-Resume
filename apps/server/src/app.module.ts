import { HttpException, Module } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { RavenInterceptor, RavenModule } from "nest-raven";
import { ZodValidationPipe } from "nestjs-zod";

import { ConfigModule } from "./config/config.module";
import { HealthModule } from "./health/health.module";
import { PrinterModule } from "./printer/printer.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    RavenModule,
    HealthModule,

    // PDF Generation
    PrinterModule,
    StorageModule,
  ],
  providers: [
    // Validation
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // Error Handling
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
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
