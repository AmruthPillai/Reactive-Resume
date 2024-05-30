import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy, StrategyOptionWithRequest, Profile } from 'passport-linkedin-oauth2';
import { UserService } from '@/server/user/user.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(
    readonly clientID: string,
    readonly clientSecret: string,
    readonly callbackURL: string,
    private readonly userService: UserService,
  ) {
    super({
      clientID, clientSecret, callbackURL,
      scope: ['email', 'profile', 'openid'],
      passReqToCallback: true,
    } as StrategyOptionWithRequest);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: string | Error | null, user?: Express.User, info?: unknown) => void,
  ) {
    const { id_, emails, name, photos } = profile;

    const email = profile.email;
    const picture = profile.picture;

    console.log(profile.id.toLowerCase())

    const id = profile.id.toLowerCase();

    let user: User | null = null;

    if (!email) throw new BadRequestException();

    try {
      user = await this.userService.findOneByIdentifier(email) ?? await this.userService.findOneByIdentifier(id);

      if (!user) throw new Error('User not found.');

      done(null, user);
    } catch {
      try {
        user = await this.userService.create({
          email,
          picture,
          locale: "en-US",
          name: `${profile.givenName} ${profile.familyName}`,
          provider: "linkedin",
          emailVerified: true, // auto-verify emails
          username: `${id}`,
          secrets: { create: {} },
        });

        done(null, user);
      } catch {
        throw new BadRequestException('User already exists');
      }
    }
  }
}