import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthProvidersDto } from "@reactive-resume/dto";

import { Config } from "../../config/schema";

@Injectable()
export class OAuthProvidersService {
  constructor(private readonly configService: ConfigService<Config>) {}

  getAuthProviders(): AuthProvidersDto {
    const providers: AuthProvidersDto = [];

    // Always include email auth unless explicitly disabled
    if (!this.configService.get("DISABLE_EMAIL_AUTH")) {
      providers.push("email");
    }

    // Check OAuth providers
    if (this.configService.get("GITHUB_CLIENT_ID")) {
      providers.push("github");
    }

    if (this.configService.get("GOOGLE_CLIENT_ID")) {
      providers.push("google");
    }

    if (this.configService.get("OPENID_CLIENT_ID")) {
      providers.push("openid");
    }

    return providers;
  }

  isProviderEnabled(provider: string): boolean {
    return this.getAuthProviders().includes(provider as any);
  }

  getOAuthConfig(provider: string) {
    switch (provider) {
      case "github":
        return {
          clientId: this.configService.getOrThrow("GITHUB_CLIENT_ID"),
          clientSecret: this.configService.getOrThrow("GITHUB_CLIENT_SECRET"),
          callbackUrl: this.configService.getOrThrow("GITHUB_CALLBACK_URL"),
        };
      case "google":
        return {
          clientId: this.configService.getOrThrow("GOOGLE_CLIENT_ID"),
          clientSecret: this.configService.getOrThrow("GOOGLE_CLIENT_SECRET"),
          callbackUrl: this.configService.getOrThrow("GOOGLE_CALLBACK_URL"),
        };
      case "openid":
        return {
          clientId: this.configService.getOrThrow("OPENID_CLIENT_ID"),
          clientSecret: this.configService.getOrThrow("OPENID_CLIENT_SECRET"),
          callbackUrl: this.configService.getOrThrow("OPENID_CALLBACK_URL"),
          issuer: this.configService.getOrThrow("OPENID_ISSUER"),
        };
      default:
        throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
  }
}
