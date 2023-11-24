import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ErrorMessage, processUsername } from "@reactive-resume/utils";
import { Profile, Strategy, StrategyOption } from "passport-linkedin-oauth2";

import { UserService } from "@/server/user/user.service";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor(
    readonly clientID: string,
    readonly clientSecret: string,
    readonly callbackURL: string,
    private readonly userService: UserService,
  ) {
    super({ clientID, clientSecret, callbackURL, scope: ["email", "profile"] } as StrategyOption);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err?: string | Error | null, user?: Express.User, info?: unknown) => void,
  ) {
    const { displayName, emails, photos, username } = profile;

    const email = emails?.[0].value ?? `${username}@linkedin.com`;
    const picture = photos?.[0].value;

    let user: User | null = null;

    if (!email) throw new BadRequestException();

    try {
      const user = await this.userService.findOneByIdentifier(email);

      if (!user) throw new UnauthorizedException();

      done(null, user);
    } catch (error) {
      try {
        user = await this.userService.create({
          email,
          picture,
          locale: "en-US",
          name: displayName,
          provider: "linkedin",
          emailVerified: true, // auto-verify emails
          username: processUsername(username ?? email.split("@")[0]),
          secrets: { create: {} },
        });

        done(null, user);
      } catch (error) {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }
    }
  }
}
