import { Injectable } from "@nestjs/common";
import { RegisterDto, UserWithSecrets } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import * as bcryptjs from "bcryptjs";

import { MailService } from "../../mail/mail.service";
import { UserService } from "../../user/user.service";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserWithSecrets> {
    const { name, email, username, locale, password } = registerDto;

    const hashedPassword = await this.hashPassword(password);

    try {
      const user = await this.userService.create({
        name,
        email,
        username,
        locale,
        provider: "email",
        emailVerified: false,
        secrets: {
          create: {
            password: hashedPassword,
          },
        },
      });

      await this.sendVerificationEmail(email);

      return user;
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === "P2002") {
        throw new Error(ErrorMessage.UserAlreadyExists);
      }
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  private async sendVerificationEmail(email: string): Promise<void> {
    // Generate verification token
    const verificationToken = await this.generateVerificationToken();

    // Update user with verification token
    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          verificationToken,
        },
      },
    });

    // Send verification email
    await this.mailService.sendEmail({
      to: email,
      subject: "Verify your email address",
      text: `Please verify your email address by clicking the following link: ${process.env.PUBLIC_URL}/auth/verify?token=${verificationToken}`,
    });
  }

  private async generateVerificationToken(): Promise<string> {
    // Generate a secure random token
    return require("crypto").randomBytes(32).toString("hex");
  }
}
