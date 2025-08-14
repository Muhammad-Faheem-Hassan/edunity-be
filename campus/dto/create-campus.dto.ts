import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCampusDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  referralCode?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}