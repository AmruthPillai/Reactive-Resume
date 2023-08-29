import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateWhatsappUserDto {
  // @MinLength(3)
  // @Transform(({ value }) => (value as string).toLowerCase().replace(/[ ]/gi, '-'))
  // @Matches(/^[a-z0-9-]+$/, {
  //   message: 'username can contain only lowercase characters, numbers and hyphens',
  // })

  @IsString()
  whatsappName: string;

  @IsString()
  whatsappNumber: string;

  @IsString()
  lastSessionSelection?: string;

  @IsString()
  currentSession?: string;

  @IsString()
  previewUrl?: string;

  @IsString()
  lastCvDetails?: string;

  @IsString()
  lastjobDescription?: string;
}
