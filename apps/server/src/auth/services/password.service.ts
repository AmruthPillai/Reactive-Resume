import { Injectable } from "@nestjs/common";
import * as bcryptjs from "bcryptjs";

import { MailService } from "../../mail/mail.service";
import { UserService } from "../../user/user.service";

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async forgotPassword(email: string): Promise<void> {
    const resetToken = await this.generateResetToken();

    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          resetToken,
        },
      },
    });

    await this.mailService.sendEmail({
      to: email,
      subject: "Reset your Reactive Resume password",
      text: `You requested a password reset. Click the following link to reset your password: ${process.env.PUBLIC_URL}/auth/reset-password?token=${resetToken}`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedPassword = await this.hashPassword(newPassword);

    await this.userService.updateByResetToken(token, {
      resetToken: null,
      password: hashedPassword,
    });
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userService.findOneById(userId);

    if (!user.secrets?.password) {
      throw new Error("Password not set for this user");
    }

    const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.secrets.password);
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await this.hashPassword(newPassword);

    await this.userService.updateByEmail(user.email, {
      secrets: {
        update: {
          password: hashedNewPassword,
        },
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  private async generateResetToken(): Promise<string> {
    // Generate a secure random token
    return require("crypto").randomBytes(32).toString("hex");
  }
}
