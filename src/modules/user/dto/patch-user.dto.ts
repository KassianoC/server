import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';
import { UpdateDateColumn } from 'typeorm';

export class PatchUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address_line_1?: string;

  @IsString()
  @IsOptional()
  address_line_2?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state_code?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  @IsString()
  @IsOptional()
  language?: 'pt' | 'en';

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @UpdateDateColumn()
  updated_at: Date;
}
