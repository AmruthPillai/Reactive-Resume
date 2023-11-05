import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import { UserWithSecrets } from "@reactive-resume/dto";
import { Request } from "express";

export const User = createParamDecorator((data: keyof UserWithSecrets, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;
  const user = request.user as UserWithSecrets;

  return data ? user?.[data] : user;
});
