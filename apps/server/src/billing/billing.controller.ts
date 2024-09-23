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
  async subscribe(
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

    const customerPageUrl = sumitCustomerResult.data.Data.CustomerHistoryURL;

    const subscription = await this.billingService.upsertUserSubscription(body.userId, {
      customerId: body.extCustomerId ?? "",
      paymentId: body.extPaymentId ?? "",
      isCanceled: false,
      isPro: true,
      customerPageUrl: customerPageUrl,
    });

    return subscription;
  }

  @Post("/cancel")
  async cancel(@Body() body: BillingEntity) {
    console.log(body);
    return await this.billingService.updateUserSubscriptionByCustomerId(
      String(body.Properties.Billing_Customer[0].ID),
      {
        isCanceled: true,
        nextBillingDate: body.Properties.Billing_Date_NextBilling[0],
      },
    );
  }
}

type BillingEntity = {
  Folder: number;
  EntityID: number;
  Type: string;
  Properties: BillingProperties;
};

type BillingProperties = {
  Billing_StatusEnum: number[];
  Billing_Date_NextBilling: string[];
  Billing_Customer: BillingCustomer[];
};

type BillingCustomer = {
  ID: number;
  Name: string;
  Version: number;
  Status: number;
  SchemaID: number;
};
