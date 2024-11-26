import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { AuthenticationMiddleware } from "../middleware/authentication.middleware";
import { ResumeModule } from "../resume/resume.module";
import { UserModule } from "../user/user.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [UserModule, AuthModule.register(), ResumeModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
