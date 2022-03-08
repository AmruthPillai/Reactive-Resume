import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';

import { User } from '@/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('sendgrid.apiKey'));
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    return SendGrid.send(mail);
  }

  async sendForgotPasswordEmail(user: User, resetToken: string): Promise<void> {
    const appUrl = this.configService.get<string>('app.url');
    const url = `${appUrl}?modal=auth.reset&resetToken=${resetToken}`;

    const mailData: SendGrid.MailDataRequired = {
      from: {
        name: this.configService.get<string>('sendgrid.fromName'),
        email: this.configService.get<string>('sendgrid.fromEmail'),
      },
      to: user.email,
      hideWarnings: true,
      dynamicTemplateData: { url },
      templateId: this.configService.get<string>('sendgrid.forgotPasswordTemplateId'),
    };

    await SendGrid.send(mailData);

    return;
  }
}
