import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Language } from '../../../common/enums/language.enum';

export class CreateOrderItemDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  order_id: string;

  @IsOptional()
  @IsUUID()
  personalization_id?: string;

  @IsNotEmpty()
  @IsString()
  book_title: string;

  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsString()
  preview_url?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
