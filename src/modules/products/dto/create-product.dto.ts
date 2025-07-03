import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Language } from '../../../common/enums/language.enum';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  client_id?: string;

  @IsNotEmpty()
  @IsString()
  product_type: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsString()
  preview_url?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  page_images?: string[];

  @IsOptional()
  @IsString()
  image_example?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  pages?: number;

  @IsOptional()
  @IsString()
  book_format?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  bar_code?: string;
}
