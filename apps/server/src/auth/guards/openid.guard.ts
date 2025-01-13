import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OpenIDGuard extends AuthGuard("openid") {}
