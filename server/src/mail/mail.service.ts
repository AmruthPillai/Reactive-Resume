import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

import { User } from '@/users/entities/user.entity';

import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('mail.host'),
      port: this.configService.get<number>('mail.port'),
      pool: true,
      secure: false,
      tls: { ciphers: 'SSLv3' },
      auth: {
        user: this.configService.get('mail.username'),
        pass: this.configService.get('mail.password'),
      },
    });
  }

  async sendEmail(sendMailDto: SendMailDto) {
    this.transporter.sendMail({
      from: `${sendMailDto.from.name} <${sendMailDto.from.email}>`,
      to: `${sendMailDto.to.name} <${sendMailDto.to.email}>`,
      subject: sendMailDto.subject,
      text: sendMailDto.message,
      html: sendMailDto.message,
    });
  }

  async sendForgotPasswordEmail(user: User, resetToken: string): Promise<void> {
    const appUrl = this.configService.get('app.url');
    const url = `${appUrl}?modal=auth.reset&resetToken=${resetToken}`;

    const sendMailDto: SendMailDto = {
      from: {
        name: this.configService.get('mail.from.name'),
        email: this.configService.get('mail.from.email'),
      },
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Reset your Reactive Resume password',
      message: `<p>Hey ${user.name}!</p> <p>You can reset your password by visiting this link: <a href="${url}">${url}</a>.</p> <p>But hurry, because it will expire in 30 minutes.</p>`,
    };

    await this.sendEmail(sendMailDto);
  }
}
