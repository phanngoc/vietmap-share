import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateRentalDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  packageId: number;

  @IsOptional()
  @IsString()
  paymentImage?: string;
} 