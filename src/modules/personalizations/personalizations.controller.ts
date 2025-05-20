import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalizationsService } from './personalizations.service';
import { CreatePersonalizationDto } from './dto/create-personalization.dto';
import { UpdatePersonalizationDto } from './dto/update-personalization.dto';

@Controller('personalizations')
export class PersonalizationsController {
  constructor(private readonly personalizationsService: PersonalizationsService) {}

  @Post()
  create(@Body() createPersonalizationDto: CreatePersonalizationDto) {
    return this.personalizationsService.create(createPersonalizationDto);
  }

  @Get()
  findAll() {
    return this.personalizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalizationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalizationDto: UpdatePersonalizationDto) {
    return this.personalizationsService.update(+id, updatePersonalizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalizationsService.remove(+id);
  }
}
