import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ErrorMessage, processUsername } from "@reactive-resume/utils";
import { Strategy, StrategyOptionWithRequest } from "passport-linkedin-oauth2";

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
      scope: ["profile", "email", "openid"],
      passReqToCallback: true,
      state: true,
    } as StrategyOptionWithRequest);
  }

  async validate(
    _request: Express.Request,
    _accessToken: string,
    _refreshToken: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: any,
    done: (err?: string | Error | null, user?: Express.User, info?: unknown) => void,
  ) {
    console.log("profile", profile);
    const { displayName, email, picture } = profile;
    let user: User | null = null;

    if (!email) throw new BadRequestException();

    try {
      const user = await this.userService.findOneByIdentifier(email);
      if (!user) throw new Error("User not found.");
      done(null, user);
    } catch {
      try {
        user = await this.userService.create({
          email,
          picture,
          locale: "en-US",
          name: displayName,
          provider: "linkedin",
          emailVerified: true, // auto-verify emails
          username: processUsername(email.split("@")[0]),
          secrets: { create: {} },
        });
        done(null, user);
      } catch {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }
    }
  }
}
