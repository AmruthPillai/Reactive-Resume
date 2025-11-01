import { Injectable } from "@nestjs/common";
import { MailService } from "@/server/mail/mail.service";
import { ContactDto } from "./dto/contact.dto";

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async sendContactEmail(contactDto: ContactDto) {
    const { name, email, subject, message } = contactDto;

    await this.mailService.sendEmail({
      to: "support@nasonga.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong>Subject:</strong> ${subject}
            </p>
          </div>

          <div style="background: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

          <p style="font-size: 12px; color: #666;">
            You can reply directly to this email to respond to ${name} at ${email}
          </p>
        </div>
      `,
    });
  }
}
