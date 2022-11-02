import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class MailRecipient {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class SendMailDto {
  @IsDefined()
  @Type(() => MailRecipient)
  from: MailRecipient;

  @IsDefined()
  @Type(() => MailRecipient)
  to: MailRecipient;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
