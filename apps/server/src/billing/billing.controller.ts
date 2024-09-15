import { HttpService } from "@nestjs/axios";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User as UserEntity } from "@prisma/client";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { BillingService } from "./billing.service";

@Controller("billing")
export class BillingController {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly billingService: BillingService,
  ) {}

  @UseGuards(TwoFactorGuard)
  @Post("/subscribe")
  async subscripbe(
    @User() user: UserEntity,
    @Body() body: { userId: string; extCustomerId?: string; extPaymentId?: string },
  ) {
    const sumitApiKey = this.configService.getOrThrow("SUMIT_API_KEY");
    const sumitCompanyId = this.configService.getOrThrow("SUMIT_CUSTOMER_ID");

    const getCustomerInformationURL = "https://api.sumit.co.il/accounting/customers/getdetailsurl/";
    const sumitCustomerResult = await this.httpService.axiosRef.post(getCustomerInformationURL, {
      Credentials: { CompanyID: sumitCompanyId, APIKey: sumitApiKey },
      CustomerID: body.extCustomerId,
    });

    /* const getPaymentInformationURL = "https://api.sumit.co.il/accounting/payments/getdetailsurl/";
    const sumitPaymentResult = await this.httpService.axiosRef.post(getPaymentInformationURL, {
      Credentials: { CompanyID: sumitCompanyId, APIKey: sumitApiKey },
      PaymentID: body.extPaymentId,
    }); */

    const subscription = await this.billingService.upsertUserSubscription(body.userId, {
      customerId: body.extCustomerId ?? "",
      paymentId: body.extPaymentId ?? "",
      isCanceled: false,
      isPro: true,
    });

    return subscription;
  }
}
