import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { UserWithSecrets } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import { Request } from "express";

import { PortfolioService } from "../portfolio.service";

@Injectable()
export class PortfolioGuard implements CanActivate {
  constructor(private readonly portfolioService: PortfolioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserWithSecrets | false;

    try {
      const portfolio = await this.portfolioService.findOne(
        request.params.id,
        user ? user.id : undefined,
      );

      // First check if the portfolio is public, if yes, attach the portfolio to the request payload.
      if (portfolio.visibility === "public") {
        request.payload = { portfolio };
      }

      // If the portfolio is private and the user is authenticated and is the owner of the portfolio, attach the portfolio to the request payload.
      // Else, if either the user is not authenticated or is not the owner of the portfolio, throw a 404 error.
      if (portfolio.visibility === "private") {
        if (user && user.id === portfolio.userId) {
          request.payload = { portfolio };
        } else {
          throw new NotFoundException(ErrorMessage.PortfolioNotFound);
        }
      }

      return true;
    } catch {
      throw new NotFoundException(ErrorMessage.PortfolioNotFound);
    }
  }
}
