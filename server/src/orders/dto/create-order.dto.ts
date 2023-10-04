import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  salesAmount: number;

  @IsString()
  item: string;

  @IsString()
  transactionId?: string;

  @IsString()
  whatsappNumber?: string;

  @IsDateString()
  expiredDate?: Date;

  @IsString()
  transactionResponse;

  @IsString()
  status;
}
