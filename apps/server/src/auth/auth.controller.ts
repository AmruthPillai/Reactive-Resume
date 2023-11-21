import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  authResponseSchema,
  backupCodesSchema,
  ForgotPasswordDto,
  messageSchema,
  RegisterDto,
  ResetPasswordDto,
  TwoFactorBackupDto,
  TwoFactorDto,
  UpdatePasswordDto,
  userSchema,
  UserWithSecrets,
} from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import type { Response } from "express";

import { User } from "../user/decorators/user.decorator";
import { UtilsService } from "../utils/utils.service";
import { AuthService } from "./auth.service";
import { GitHubGuard } from "./guards/github.guard";
import { GoogleGuard } from "./guards/google.guard";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { TwoFactorGuard } from "./guards/two-factor.guard";
import { getCookieOptions } from "./utils/cookie";
import { payloadSchema } from "./utils/payload";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utils: UtilsService,
  ) {}

  private async exchangeToken(id: string, email: string, isTwoFactorAuth: boolean = false) {
    try {
      const payload = payloadSchema.parse({ id, isTwoFactorAuth });

      const accessToken = this.authService.generateToken("access", payload);
      const refreshToken = this.authService.generateToken("refresh", payload);

      // Set Refresh Token in Database
      await this.authService.setRefreshToken(email, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException(error, ErrorMessage.SomethingWentWrong);
    }
  }

  private async handleAuthenticationResponse(
    user: UserWithSecrets,
    response: Response,
    isTwoFactorAuth: boolean = false,
    redirect: boolean = false,
  ) {
    let status = "authenticated";

    const redirectUrl = new URL(`${this.utils.getUrl()}/auth/callback`);

    const { accessToken, refreshToken } = await this.exchangeToken(
      user.id,
      user.email,
      isTwoFactorAuth,
    );

    response.cookie("Authentication", accessToken, getCookieOptions("access"));
    response.cookie("Refresh", refreshToken, getCookieOptions("refresh"));

    if (user.twoFactorEnabled && !isTwoFactorAuth) status = "2fa_required";

    const responseData = authResponseSchema.parse({ status, user });

    redirectUrl.searchParams.set("status", status);

    if (redirect) response.redirect(redirectUrl.toString());
    else response.status(200).send(responseData);
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.register(registerDto);

    return this.handleAuthenticationResponse(user, response);
  }

  @Post("login")
  @UseGuards(LocalGuard)
  async login(@User() user: UserWithSecrets, @Res({ passthrough: true }) response: Response) {
    return this.handleAuthenticationResponse(user, response);
  }

  @Get("providers")
  getAuthProviders() {
    return this.authService.getAuthProviders();
  }

  // OAuth Flows
  @ApiTags("OAuth", "GitHub")
  @Get("github")
  @UseGuards(GitHubGuard)
  githubLogin() {
    return;
  }

  @ApiTags("OAuth", "GitHub")
  @Get("github/callback")
  @UseGuards(GitHubGuard)
  async githubCallback(
    @User() user: UserWithSecrets,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.handleAuthenticationResponse(user, response, false, true);
  }

  @ApiTags("OAuth", "Google")
  @Get("google")
  @UseGuards(GoogleGuard)
  googleLogin() {
    return;
  }

  @ApiTags("OAuth", "Google")
  @Get("google/callback")
  @UseGuards(GoogleGuard)
  async googleCallback(
    @User() user: UserWithSecrets,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.handleAuthenticationResponse(user, response, false, true);
  }

  @Post("refresh")
  @UseGuards(RefreshGuard)
  async refresh(@User() user: UserWithSecrets, @Res({ passthrough: true }) response: Response) {
    return this.handleAuthenticationResponse(user, response, true);
  }

  @Patch("password")
  @UseGuards(TwoFactorGuard)
  async updatePassword(@User("email") email: string, @Body() { password }: UpdatePasswordDto) {
    await this.authService.updatePassword(email, password);

    return { message: "Your password has been successfully updated." };
  }

  @Post("logout")
  @UseGuards(TwoFactorGuard)
  async logout(@User() user: UserWithSecrets, @Res({ passthrough: true }) response: Response) {
    await this.authService.setRefreshToken(user.email, null);

    response.clearCookie("Authentication");
    response.clearCookie("Refresh");

    const data = messageSchema.parse({ message: "You have been logged out, tschüss!" });
    response.status(200).send(data);
  }

  // Two-Factor Authentication Flows
  @ApiTags("Two-Factor Auth")
  @Post("2fa/setup")
  @UseGuards(JwtGuard)
  async setup2FASecret(@User("email") email: string) {
    return this.authService.setup2FASecret(email);
  }

  @ApiTags("Two-Factor Auth")
  @HttpCode(200)
  @Post("2fa/enable")
  @UseGuards(JwtGuard)
  async enable2FA(
    @User("id") id: string,
    @User("email") email: string,
    @Body() { code }: TwoFactorDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { backupCodes } = await this.authService.enable2FA(email, code);

    const { accessToken, refreshToken } = await this.exchangeToken(id, email, true);

    response.cookie("Authentication", accessToken, getCookieOptions("access"));
    response.cookie("Refresh", refreshToken, getCookieOptions("refresh"));

    const data = backupCodesSchema.parse({ backupCodes });
    response.status(200).send(data);
  }

  @ApiTags("Two-Factor Auth")
  @HttpCode(200)
  @Post("2fa/disable")
  @UseGuards(TwoFactorGuard)
  async disable2FA(@User("email") email: string) {
    await this.authService.disable2FA(email);

    return { message: "Two-factor authentication has been successfully disabled on your account." };
  }

  @ApiTags("Two-Factor Auth")
  @HttpCode(200)
  @Post("2fa/verify")
  @UseGuards(JwtGuard)
  async verify2FACode(
    @User() user: UserWithSecrets,
    @Body() { code }: TwoFactorDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.verify2FACode(user.email, code);

    const { accessToken, refreshToken } = await this.exchangeToken(user.id, user.email, true);

    response.cookie("Authentication", accessToken, getCookieOptions("access"));
    response.cookie("Refresh", refreshToken, getCookieOptions("refresh"));

    response.status(200).send(userSchema.parse(user));
  }

  @ApiTags("Two-Factor Auth")
  @HttpCode(200)
  @Post("2fa/backup")
  @UseGuards(JwtGuard)
  async useBackup2FACode(
    @User("id") id: string,
    @User("email") email: string,
    @Body() { code }: TwoFactorBackupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.useBackup2FACode(email, code);

    return this.handleAuthenticationResponse(user, response, true);
  }

  // Password Recovery Flows
  @ApiTags("Password Reset")
  @HttpCode(200)
  @Post("forgot-password")
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    try {
      await this.authService.forgotPassword(email);
    } catch (error) {
      // pass
    }

    return {
      message:
        "A password reset link should have been sent to your inbox, if an account existed with the email you provided.",
    };
  }

  @ApiTags("Password Reset")
  @HttpCode(200)
  @Post("reset-password")
  async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    try {
      await this.authService.resetPassword(token, password);

      return { message: "Your password has been successfully reset." };
    } catch (error) {
      throw new BadRequestException(ErrorMessage.InvalidResetToken);
    }
  }

  // Email Verification Flows
  @ApiTags("Email Verification")
  @Post("verify-email")
  @UseGuards(TwoFactorGuard)
  async verifyEmail(
    @User("id") id: string,
    @User("emailVerified") emailVerified: boolean,
    @Query("token") token: string,
  ) {
    if (!token) throw new BadRequestException(ErrorMessage.InvalidVerificationToken);

    if (emailVerified) {
      throw new BadRequestException(ErrorMessage.EmailAlreadyVerified);
    }

    await this.authService.verifyEmail(id, token);

    return { message: "Your email has been successfully verified." };
  }

  @ApiTags("Email Verification")
  @Post("verify-email/resend")
  @UseGuards(TwoFactorGuard)
  async resendVerificationEmail(
    @User("email") email: string,
    @User("emailVerified") emailVerified: boolean,
  ) {
    if (emailVerified) {
      throw new BadRequestException(ErrorMessage.EmailAlreadyVerified);
    }

    await this.authService.sendVerificationEmail(email);

    return {
      message: "You should have received a new email with a link to verify your email address.",
    };
  }
}
