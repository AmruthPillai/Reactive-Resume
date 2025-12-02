import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { ErrorMessage } from "@reactive-resume/utils";

import { UserService } from "../../user/user.service";

@Injectable()
export class TwoFactorService {
  constructor(private readonly userService: UserService) {}

  async setup2FASecret(email: string): Promise<{ message: string }> {
    const user = await this.userService.findOneByIdentifier(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.twoFactorEnabled) {
      throw new Error(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, "Reactive Resume", secret);

    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          twoFactorSecret: secret,
        },
      },
    });

    return {
      message: `Scan this QR code with your authenticator app: ${otpauth}`,
    };
  }

  async enable2FA(email: string, code: string): Promise<{ backupCodes: string[] }> {
    const user = await this.userService.findOneByIdentifier(email);

    if (!user || !user.secrets?.twoFactorSecret) {
      throw new Error("2FA setup not initiated");
    }

    if (user.twoFactorEnabled) {
      throw new Error(ErrorMessage.TwoFactorAlreadyEnabled);
    }

    const isValid = authenticator.verify({
      token: code,
      secret: user.secrets.twoFactorSecret,
    });

    if (!isValid) {
      throw new Error(ErrorMessage.InvalidTwoFactorCode);
    }

    const backupCodes = await this.generateBackupCodes();

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: true,
      secrets: {
        update: {
          twoFactorBackupCodes: backupCodes,
        },
      },
    });

    return { backupCodes };
  }

  async disable2FA(email: string): Promise<void> {
    const user = await this.userService.findOneByIdentifier(email);

    if (!user || !user.twoFactorEnabled) {
      throw new Error(ErrorMessage.TwoFactorNotEnabled);
    }

    await this.userService.updateByEmail(email, {
      twoFactorEnabled: false,
      secrets: {
        update: {
          twoFactorSecret: null,
          twoFactorBackupCodes: [],
        },
      },
    });
  }

  async verify2FACode(email: string, code: string): Promise<boolean> {
    const user = await this.userService.findOneByIdentifier(email);

    if (!user || !user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
      return false;
    }

    return authenticator.verify({
      token: code,
      secret: user.secrets.twoFactorSecret,
    });
  }

  async verifyBackupCode(email: string, code: string): Promise<boolean> {
    const user = await this.userService.findOneByIdentifier(email);

    if (!user || !user.twoFactorEnabled || !user.secrets?.twoFactorBackupCodes) {
      return false;
    }

    const codeIndex = user.secrets.twoFactorBackupCodes.indexOf(code);
    if (codeIndex === -1) {
      return false;
    }

    // Remove the used backup code
    const updatedCodes = [...user.secrets.twoFactorBackupCodes];
    updatedCodes.splice(codeIndex, 1);

    await this.userService.updateByEmail(email, {
      secrets: {
        update: {
          twoFactorBackupCodes: updatedCodes,
        },
      },
    });

    return true;
  }

  private async generateBackupCodes(): Promise<string[]> {
    const codes: string[] = [];
    for (let i = 0; i < 8; i++) {
      codes.push(require("crypto").randomBytes(4).toString("hex").toUpperCase());
    }
    return codes;
  }
}
