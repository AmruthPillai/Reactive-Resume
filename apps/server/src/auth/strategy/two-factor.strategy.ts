import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { Config } from "@/server/config/schema";
import { UserService } from "@/server/user/user.service";

import { Payload } from "../utils/payload";

@Injectable()
export class TwoFactorStrategy extends PassportStrategy(Strategy, "two-factor") {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService,
  ) {
    const extractors = [(request: Request) => request?.cookies?.Authentication];

    super({
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: Payload) {
    const user = await this.userService.findOneById(payload.id);

    // If the user has 2FA disabled, this will follow the same route as JWT Strategy
    if (!user.twoFactorEnabled) return user;

    if (payload.isTwoFactorAuth) return user;
  }
}
