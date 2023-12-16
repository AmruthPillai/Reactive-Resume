import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  passwordraw: string;

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
