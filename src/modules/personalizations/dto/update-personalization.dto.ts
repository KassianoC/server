import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalizationDto } from './create-personalization.dto';

export class UpdatePersonalizationDto extends PartialType(CreatePersonalizationDto) {}
