import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(3)
  @Transform(({ value }) => (value as string).toLowerCase().replace(/[ ]/gi, '-'))
  @Matches(/^[a-z0-9-]+$/, {
    message: 'username can contain only lowercase characters, numbers and hyphens',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordraw: string;

  @IsString()
  @IsNotEmpty()
  provider: 'email';

  @IsString()
  resetToken?: string;

  @IsString()
  whatsappName: string;

  @IsString()
  @IsNotEmpty()
  whatsappNumber: string;

  @IsString()
  lastSessionSelection: string;

  @IsString()
  currentSession: string;

  @IsString()
  previewUrl: string;

  @IsString()
  status: string;

  @IsString()
  lastCvDetails: string;

  @IsString()
  lastjobDescription: string;
}
