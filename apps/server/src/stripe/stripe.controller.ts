import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { StripeCheckoutRequest } from "@reactive-resume/schema";

import { User } from "@/server/user/decorators/user.decorator";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { UtilsService } from "../utils/utils.service";
import { StripeService } from "./stripe.service";

@ApiTags("Stripe")
@Controller("stripe")
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly utils: UtilsService,
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
  createCheckoutSession(@User() user: UserEntity, @Body() request: StripeCheckoutRequest) {
    return this.stripeService.createCheckoutSession(user.id, request.priceId, request.quantity);
  }
}
