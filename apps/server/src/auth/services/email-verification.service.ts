import { Injectable } from "@nestjs/common";
import { ErrorMessage } from "@reactive-resume/utils";

import { UserService } from "../../user/user.service";

@Injectable()
export class EmailVerificationService {
  constructor(private readonly userService: UserService) {}

  async sendVerificationEmail(email: string): Promise<void> {
    const verificationToken = await this.generateVerificationToken();

    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          verificationToken,
        },
      },
    });

    // Email sending would be handled by MailService in the controller
    // This service just manages the token generation and storage
  }

  async verifyEmail(userId: string, token: string): Promise<void> {
    const user = await this.userService.findOneById(userId);

    if (!user.secrets?.verificationToken) {
      throw new Error(ErrorMessage.InvalidVerificationToken);
    }

    if (user.secrets.verificationToken !== token) {
      throw new Error(ErrorMessage.InvalidVerificationToken);
    }

    await this.userService.updateByEmail(user.email, {
      emailVerified: true,
      secrets: {
        update: {
          verificationToken: null,
        },
      },
    });
  }

  async resendVerificationEmail(email: string): Promise<void> {
    // Check if user exists and needs verification
    const user = await this.userService.findOneByIdentifier(email);

    if (!user) {
      // Don't reveal if email exists for security
      return;
    }

    if (user.emailVerified) {
      throw new Error(ErrorMessage.EmailAlreadyVerified);
    }

    await this.sendVerificationEmail(email);
  }

  private async generateVerificationToken(): Promise<string> {
    return require("crypto").randomBytes(32).toString("hex");
  }
}
