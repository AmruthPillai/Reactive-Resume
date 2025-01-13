import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ErrorMessage, processUsername } from "@reactive-resume/utils";
import { Profile, Strategy, StrategyOptions } from "passport-openidconnect";

import { UserService } from "@/server/user/user.service";

@Injectable()
export class OpenIDStrategy extends PassportStrategy(Strategy, "openid") {
  constructor(
    readonly authorizationURL: string,
    readonly callbackURL: string,
    readonly clientID: string,
    readonly clientSecret: string,
    readonly issuer: string,
    readonly tokenURL: string,
    readonly userInfoURL: string,
    private readonly userService: UserService,
  ) {
    super({
      authorizationURL,
      callbackURL,
      clientID,
      clientSecret,
      issuer,
      tokenURL,
      userInfoURL,
      scope: "openid email profile",
    } as StrategyOptions);
  }

  async validate(
    issuer: unknown,
    profile: Profile,
    done: (err?: string | Error | null, user?: Express.User, info?: unknown) => void,
  ) {
    const { displayName, emails, photos, username } = profile;

    const email = emails?.[0].value ?? `${username}@github.com`;
    const picture = photos?.[0].value;

    let user: User | null = null;

    if (!email) throw new BadRequestException(ErrorMessage.InvalidCredentials);

    try {
      const user =
        (await this.userService.findOneByIdentifier(email)) ??
        (username && (await this.userService.findOneByIdentifier(username)));

      if (!user) throw new Error(ErrorMessage.InvalidCredentials);

      done(null, user);
    } catch {
      try {
        user = await this.userService.create({
          email,
          picture,
          locale: "en-US",
          name: displayName,
          provider: "openid",
          emailVerified: true, // auto-verify emails
          username: processUsername(username ?? email.split("@")[0]),
          secrets: { create: {} },
        });

        done(null, user);
      } catch {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }
    }
  }
}
