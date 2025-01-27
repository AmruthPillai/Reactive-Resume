import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PortfolioDto } from "@reactive-resume/dto";

export const Portfolio = createParamDecorator(
  (data: keyof PortfolioDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const portfolio = request.payload?.portfolio as PortfolioDto;

    return data ? portfolio[data] : portfolio;
  },
);
