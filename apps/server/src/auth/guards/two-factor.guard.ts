import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class TwoFactorGuard extends AuthGuard("two-factor") {}
