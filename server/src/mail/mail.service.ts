import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';
import { join } from 'path';

import { User } from '@/users/entities/user.entity';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport(
      {
        host: this.configService.get<string>('mail.host'),
        port: this.configService.get<number>('mail.port'),
        auth: {
          user: this.configService.get<string>('mail.username'),
          pass: this.configService.get<string>('mail.password'),
        },
      },
      {
        from: this.configService.get<string>('mail.from'),
      }
    );
  }

  async sendForgotPasswordEmail(user: User, resetToken: string) {
    const appUrl = this.configService.get<string>('app.url');
    const url = `${appUrl}?modal=auth.reset&resetToken=${resetToken}`;
    const templateSource = readFileSync(join(__dirname, 'assets/templates/forgot-password.hbs'), 'utf-8');
    const template = compile(templateSource);
    const html = template({ name: user.name, url });

    await this.transporter.sendMail({
      to: user.email,
      subject: 'Reset your Reactive Resume password',
      html,
    });
  }
}
