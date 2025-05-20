import { Injectable } from '@nestjs/common';
import { CreatePersonalizationDto } from './dto/create-personalization.dto';
import { UpdatePersonalizationDto } from './dto/update-personalization.dto';

@Injectable()
export class PersonalizationsService {
  create(createPersonalizationDto: CreatePersonalizationDto) {
    return 'This action adds a new personalization';
  }

  findAll() {
    return `This action returns all personalizations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalization`;
  }

  update(id: number, updatePersonalizationDto: UpdatePersonalizationDto) {
    return `This action updates a #${id} personalization`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalization`;
  }
}
