import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import * as nodemailer from "nodemailer";

import { Config } from "@/server/config/schema";

import { MailService } from "./mail.service";

const emptyTransporter = nodemailer.createTransport({});

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const from = configService.get("MAIL_FROM");
        const smtpUrl = configService.get("SMTP_URL");

        if (!smtpUrl) {
          Logger.warn(
            "Since `SMTP_URL` is not set, emails would be logged to the console instead. This is not recommended for production environments.",
            "MailModule",
          );
        }

        return {
          defaults: { from },
          transport: smtpUrl || emptyTransporter,
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
