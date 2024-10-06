import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOptionWithRequest } from "passport-linkedin-oauth2";

import { UserService } from "@/server/user/user.service";

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor(
    readonly clientID: string,
    readonly clientSecret: string,
    readonly callbackURL: string,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["profile", "email", "openid", "r_basicprofile"],
      passReqToCallback: true,
      state: true,
    } as StrategyOptionWithRequest);
  }

  async validate(
    _request: Express.Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err?: string | Error | null, user?: Express.User, info?: unknown) => void,
  ) {
    const me = await this.httpService.axiosRef.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${_accessToken}`,
      },
    });

    console.log("profile", profile);
    console.log("me", me.data);
  }
}
