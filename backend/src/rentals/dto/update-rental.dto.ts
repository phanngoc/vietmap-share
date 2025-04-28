import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateRentalStatusDto {
  @IsNotEmpty()
  @IsString()
  paymentStatus: string;

  @IsOptional()
  @IsString()
  paymentReference?: string;
} 