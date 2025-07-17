// create-personalization.dto.ts
import {
  IsInt,
  IsString,
  Length,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreatePersonalizationDto {
  @IsOptional()
  @IsInt()
  user_id?: number | null;

  @IsInt()
  book_id: number;

  @IsString()
  @Length(1, 100)
  person_name: string;

  @IsEnum(['pt', 'en'])
  language: 'pt' | 'en';

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsEnum(['Male', 'Female'])
  gender: 'Male' | 'Female';

  @IsOptional()
  @IsString()
  photo?: string; // Nome/caminho do arquivo (e.g., 'foto123.jpg')
}
