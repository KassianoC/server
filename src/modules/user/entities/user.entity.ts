import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Language } from '../../../common/enums/language.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(8)
  password: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  document?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  address_line_1?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  address_line_2?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  district?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  city?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  state_code?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  postal_code?: string;

  @Column({ type: 'enum', enum: Language, nullable: true })
  @IsEnum(Language)
  @IsOptional()
  language?: Language;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  personalizations: number;
}
