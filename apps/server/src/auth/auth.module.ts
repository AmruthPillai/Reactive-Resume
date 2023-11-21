import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { Config } from "../config/schema";
import { MailModule } from "../mail/mail.module";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DummyStrategy } from "./strategy/dummy.strategy";
import { GitHubStrategy } from "./strategy/github.strategy";
import { GoogleStrategy } from "./strategy/google.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { TwoFactorStrategy } from "./strategy/two-factor.strategy";

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    return {
      module: AuthModule,
      imports: [PassportModule, JwtModule, UserModule, MailModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RefreshStrategy,
        TwoFactorStrategy,

        // OAuth2 Strategies
        {
          provide: GitHubStrategy,
          inject: [ConfigService, UserService],
          useFactory: (configService: ConfigService<Config>, userService: UserService) => {
            try {
              const clientID = configService.getOrThrow("GITHUB_CLIENT_ID");
              const clientSecret = configService.getOrThrow("GITHUB_CLIENT_SECRET");
              const callbackURL = configService.getOrThrow("GITHUB_CALLBACK_URL");

              return new GitHubStrategy(clientID, clientSecret, callbackURL, userService);
            } catch (error) {
              return new DummyStrategy();
            }
          },
        },

        {
          provide: GoogleStrategy,
          inject: [ConfigService, UserService],
          useFactory: (configService: ConfigService<Config>, userService: UserService) => {
            try {
              const clientID = configService.getOrThrow("GOOGLE_CLIENT_ID");
              const clientSecret = configService.getOrThrow("GOOGLE_CLIENT_SECRET");
              const callbackURL = configService.getOrThrow("GOOGLE_CALLBACK_URL");

              return new GoogleStrategy(clientID, clientSecret, callbackURL, userService);
            } catch (error) {
              return new DummyStrategy();
            }
          },
        },
      ],
      exports: [AuthService],
    };
  }
}
