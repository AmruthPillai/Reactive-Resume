import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { CompanyController } from "@/server/company/company.controler";
import { CompanyService } from "@/server/company/company.service";

@Module({
  imports: [AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
