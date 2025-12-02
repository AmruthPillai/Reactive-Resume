import { Injectable } from "@nestjs/common";
import { AuthProvidersDto, LoginDto, RegisterDto, UserWithSecrets } from "@reactive-resume/dto";

import { UserService } from "../user/user.service";
import { AuthenticationService } from "./services/authentication.service";
import { EmailVerificationService } from "./services/email-verification.service";
import { OAuthProvidersService } from "./services/oauth-providers.service";
import { PasswordService } from "./services/password.service";
import { RegistrationService } from "./services/registration.service";
import { TokenService } from "./services/token.service";
import { TwoFactorService } from "./services/two-factor.service";
import { Payload } from "./utils/payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
    private readonly registrationService: RegistrationService,
    private readonly passwordService: PasswordService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly twoFactorService: TwoFactorService,
    private readonly tokenService: TokenService,
    private readonly oauthProvidersService: OAuthProvidersService,
  ) {}

  // Token generation methods
  generateToken(grantType: "access" | "refresh" | "reset" | "verification", payload?: Payload) {
    switch (grantType) {
      case "access":
        if (!payload) throw new Error(ErrorMessage.InvalidTokenPayload);
        return this.tokenService.generateAccessToken(payload);
      case "refresh":
        if (!payload) throw new Error(ErrorMessage.InvalidTokenPayload);
        return this.tokenService.generateRefreshToken(payload);
      case "reset":
        return this.tokenService.generateResetToken();
      case "verification":
        return this.tokenService.generateVerificationToken();
      default:
        throw new Error(ErrorMessage.InvalidTokenGrantType);
    }
  }

  // User session management
  async setLastSignedIn(email: string) {
    await this.userService.updateByEmail(email, {
      secrets: { update: { lastSignedIn: new Date() } },
    });
  }

  async setRefreshToken(email: string, token: string | null) {
    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          refreshToken: token,
          lastSignedIn: token ? new Date() : undefined,
        },
      },
    });
  }

  async validateRefreshToken(payload: Payload, token: string) {
    const user = await this.userService.findOneById(payload.id);
    const storedRefreshToken = user.secrets?.refreshToken;

    if (!storedRefreshToken || storedRefreshToken !== token) throw new Error(ErrorMessage.InvalidRefreshToken);

    if (!user.twoFactorEnabled) return user;

    if (payload.isTwoFactorAuth) return user;
  }

  // User registration and authentication
  async register(registerDto: RegisterDto): Promise<UserWithSecrets> {
    return this.registrationService.register(registerDto);
  }

  async authenticate(loginDto: LoginDto): Promise<UserWithSecrets> {
    return this.authenticationService.authenticate(loginDto);
  }

  // Password management
  async forgotPassword(email: string) {
    return this.passwordService.forgotPassword(email);
  }

  async resetPassword(token: string, password: string) {
    return this.passwordService.resetPassword(token, password);
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    return this.passwordService.updatePassword(userId, currentPassword, newPassword);
  }

  // Email verification
  async verifyEmail(id: string, token: string) {
    return this.emailVerificationService.verifyEmail(id, token);
  }

  async resendVerificationEmail(email: string) {
    return this.emailVerificationService.resendVerificationEmail(email);
  }

  // Two-factor authentication
  async setup2FASecret(email: string) {
    return this.twoFactorService.setup2FASecret(email);
  }

  async enable2FA(email: string, code: string) {
    return this.twoFactorService.enable2FA(email, code);
  }

  async disable2FA(email: string) {
    return this.twoFactorService.disable2FA(email);
  }

  async verify2FACode(email: string, code: string) {
    return this.twoFactorService.verify2FACode(email, code);
  }

  async verifyBackupCode(email: string, code: string) {
    return this.twoFactorService.verifyBackupCode(email, code);
  }

  // OAuth providers
  getAuthProviders(): AuthProvidersDto {
    return this.oauthProvidersService.getAuthProviders();
  }
}
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async authenticate({ identifier, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifierOrThrow(identifier);

      if (!user.secrets?.password) {
        throw new BadRequestException(ErrorMessage.OAuthUser);
      }

      await this.validatePassword(password, user.secrets.password);
      await this.setLastSignedIn(user.email);

      return user;
    } catch {
      throw new BadRequestException(ErrorMessage.InvalidCredentials);
    }
  }

  // Password Reset Flows
  async forgotPassword(email: string) {
    const token = this.generateToken("reset");

    await this.userService.updateByEmail(email, {
      secrets: { update: { resetToken: token } },
    });

    const baseUrl = this.configService.get("PUBLIC_URL");
    const url = `${baseUrl}/auth/reset-password?token=${token}`;
    const subject = "Reset your Reactive Resume password";
    const text = `Please click on the link below to reset your password:\n\n${url}`;

    await this.mailService.sendEmail({ to: email, subject, text });
  }

  async updatePassword(email: string, currentPassword: string, newPassword: string) {
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    if (!user.secrets?.password) {
      throw new BadRequestException(ErrorMessage.OAuthUser);
    }

    await this.validatePassword(currentPassword, user.secrets.password);

    const newHashedPassword = await this.hash(newPassword);

    await this.userService.updateByEmail(email, {
      secrets: { update: { password: newHashedPassword } },
    });
  }

  async resetPassword(token: string, password: string) {
    const hashedPassword = await this.hash(password);

    await this.userService.updateByResetToken(token, {
      resetToken: null,
      password: hashedPassword,
    });
  }

  getAuthProviders() {
    const providers: AuthProvidersDto = [];

    if (!this.configService.get("DISABLE_EMAIL_AUTH")) {
      providers.push("email");
    }

    if (
      this.configService.get("GITHUB_CLIENT_ID") &&
      this.configService.get("GITHUB_CLIENT_SECRET") &&
      this.configService.get("GITHUB_CALLBACK_URL")
    ) {
      providers.push("github");
    }

    if (
      this.configService.get("GOOGLE_CLIENT_ID") &&
      this.configService.get("GOOGLE_CLIENT_SECRET") &&
      this.configService.get("GOOGLE_CALLBACK_URL")
    ) {
      providers.push("google");
    }

    if (
      this.configService.get("OPENID_AUTHORIZATION_URL") &&
      this.configService.get("OPENID_CALLBACK_URL") &&
      this.configService.get("OPENID_CLIENT_ID") &&
      this.configService.get("OPENID_CLIENT_SECRET") &&
      this.configService.get("OPENID_ISSUER") &&
      this.configService.get("OPENID_SCOPE") &&
      this.configService.get("OPENID_TOKEN_URL") &&
      this.configService.get("OPENID_USER_INFO_URL")
    ) {
      providers.push("openid");
    }

    return providers;
  }

  // Email Verification Flows
  async sendVerificationEmail(email: string) {
    try {
      const token = this.generateToken("verification");

      // Set the verification token in the database
      await this.userService.updateByEmail(email, {
        secrets: { update: { verificationToken: token } },
      });

      const baseUrl = this.configService.get("PUBLIC_URL");
      const url = `${baseUrl}/auth/verify-email?token=${token}`;
      const subject = "Verify your email address";
      const text = `Please verify your email address by clicking on the link below:\n\n${url}`;

      await this.mailService.sendEmail({ to: email, subject, text });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async verifyEmail(id: string, token: string) {
    const user = await this.userService.findOneById(id);

    const storedToken = user.secrets?.verificationToken;

    if (!storedToken || storedToken !== token) {
      throw new BadRequestException(ErrorMessage.InvalidVerificationToken);
    }

    await this.userService.updateByEmail(user.email, {
      emailVerified: true,
      secrets: { update: { verificationToken: null } },
    });
  }

  // Two-Factor Authentication Flows
  async setup2FASecret(email: string) {
    // If the user already has 2FA enabled, throw an error
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    if (user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(email, "Reactive Resume", secret);

    await this.userService.updateByEmail(email, {
      secrets: { update: { twoFactorSecret: secret } },
    });

    return { message: uri };
  }

  async enable2FA(email: string, code: string) {
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    // If the user already has 2FA enabled, throw an error
    if (user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    // If the user doesn't have a 2FA secret set, throw an error
    if (!user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = authenticator.verify({
      secret: user.secrets.twoFactorSecret,
      token: code,
    });

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorCode);
    }

    // Create backup codes and store them in the database
    const backupCodes = Array.from({ length: 8 }, () => randomBytes(5).toString("hex"));

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: true,
      secrets: { update: { twoFactorBackupCodes: backupCodes } },
    });

    return { backupCodes };
  }

  async disable2FA(email: string) {
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    // If the user doesn't have 2FA enabled, throw an error
    if (!user.twoFactorEnabled) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: false,
      secrets: { update: { twoFactorSecret: null, twoFactorBackupCodes: [] } },
    });
  }

  async verify2FACode(email: string, code: string) {
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
    if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = authenticator.verify({
      secret: user.secrets.twoFactorSecret,
      token: code,
    });

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorCode);
    }

    return user;
  }

  async useBackup2FACode(email: string, code: string): Promise<UserWithSecrets> {
    const user = await this.userService.findOneByIdentifierOrThrow(email);

    // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
    if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
      throw new BadRequestException(ErrorMessage.TwoFactorNotEnabled);
    }

    const verified = user.secrets.twoFactorBackupCodes.includes(code);

    if (!verified) {
      throw new BadRequestException(ErrorMessage.InvalidTwoFactorBackupCode);
    }

    // Remove the used backup code from the database
    const backupCodes = user.secrets.twoFactorBackupCodes.filter((c) => c !== code);
    await this.userService.updateByEmail(email, {
      secrets: { update: { twoFactorBackupCodes: backupCodes } },
    });

    return user;
  }
}
