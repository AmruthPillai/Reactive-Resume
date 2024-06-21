import { UserService } from "@/server/user/user.service";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { processUsername } from "@reactive-resume/utils";
import { Strategy, StrategyOptions, Issuer, Client, TokenSet } from 'openid-client'

export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover(`${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`);
  const client = new TrustIssuer.Client({
    client_id: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID!,
    client_secret: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET,
  });
  return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, "oidc") {

  constructor(
    public readonly client: Client,
    private readonly userService: UserService,
  ) {
    super({
      client,
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
        scope: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE,
      },
      passReqToCallback: false,
      usePKCE: false,
    } satisfies StrategyOptions);
  }

  async validate(tokenset: TokenSet): Promise<any> {
    try {
      const userinfo = await this.client.userinfo(tokenset);
      const { email, name, picture, given_name, family_name, preferred_username } = userinfo
      if (!email || !name) throw new BadRequestException()

      const foundUser = await this.userService.findOneByIdentifier(email)
      if (foundUser) return foundUser

      return await this.userService.create({
        email,
        picture: picture === undefined ? null : picture,
        locale: "en-US",
        name: given_name && family_name ? `${given_name} ${family_name}` : name,
        provider: "oidc",
        emailVerified: true, // auto-verify emails
        username: processUsername(preferred_username || email.split('@')[0]),
        secrets: { create: {} },
      })
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
