import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import type { UserWithSecrets } from "@reactive-resume/dto";

export const User = createParamDecorator(
  (data: keyof UserWithSecrets | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserWithSecrets;

    return data ? user[data] : user;
  },
);
