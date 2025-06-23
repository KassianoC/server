import {
  IsInt,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Language } from '../../../common/enums/language.enum';

export class CreateOrderItemDto {
  @IsOptional()
  @IsInt()
  personalization_id?: number;

  @IsOptional()
  @IsString()
  book_title: string;

  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsString()
  preview_url?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
