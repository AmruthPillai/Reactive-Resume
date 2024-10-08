import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, AuthModule.register()],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
