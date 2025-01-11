import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";

import { Config } from "@/server/config/schema";

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(options: ISendMailOptions) {
    const smtpUrl = this.configService.get("SMTP_URL");

    // If `SMTP_URL` is not set, log the email to the console
    if (!smtpUrl) {
      Logger.log(options, "MailService#sendEmail");
      return;
    }

    return this.mailerService.sendMail(options);
  }
}
