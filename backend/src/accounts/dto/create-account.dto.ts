import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
} 