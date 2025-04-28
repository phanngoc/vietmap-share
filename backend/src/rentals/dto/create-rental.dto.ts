import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

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
  @IsNumber()
  packageId: number;
} 