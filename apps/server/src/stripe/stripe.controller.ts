import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  RawBodyRequest,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { StripeCheckoutRequest } from "@reactive-resume/schema";

// import type { Response } from "express";
import { User } from "@/server/user/decorators/user.decorator";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { Config } from "../config/schema";
import { UtilsService } from "../utils/utils.service";
import { StripeService } from "./stripe.service";

@ApiTags("Payment")
@Controller("stripe")
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly utils: UtilsService,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Get("products")
  getProducts() {
    return this.stripeService.findAllProducts();
  }

  @Get("prices")
  getPrices() {
    return this.stripeService.findAllPrices();
  }

  @Get("subscriptions")
  @UseGuards(TwoFactorGuard)
  getSubscriptions(@User() user: UserEntity) {
    return this.stripeService.findAllSubscriptions(user.id);
  }

  @Post("create-checkout-session")
  @UseGuards(TwoFactorGuard)
  createCheckoutSession(@User() user: UserEntity, @Body() body: StripeCheckoutRequest) {
    return this.stripeService.createCheckoutSession(user.id, body.priceId, body.quantity);
  }

  @Get("create-portal-link")
  @UseGuards(TwoFactorGuard)
  createPortalLink(@User() user: UserEntity) {
    return this.stripeService.createPortalLink(user.id, user.email);
  }

  @Post("webhook")
  // @UseGuards(TwoFactorGuard)
  webhook(
    @User() user: UserEntity,
    @Req() req: RawBodyRequest<Request>,
    @Res({ passthrough: true }) res: Response,
    @Headers("stripe-signature") sig: string,
  ) {
    return this.stripeService.webhooks(req, res, sig);
  }
}
