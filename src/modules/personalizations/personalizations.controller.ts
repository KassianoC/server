import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PersonalizationsService } from './personalizations.service';
import { CreatePersonalizationDto } from './dto/create-personalization.dto';
import { UpdatePersonalizationDto } from './dto/update-personalization.dto';

@Controller('personalizations')
export class PersonalizationsController {
  constructor(
    private readonly personalizationsService: PersonalizationsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/personalizations',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createPersonalizationDto: CreatePersonalizationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('A imagem é obrigatória');
    }
    const personalization = await this.personalizationsService.create(
      createPersonalizationDto,
      file,
    );
    return { message: 'Personalização criada com sucesso', personalization };
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/public/uploads/personalizations',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePersonalizationDto: UpdatePersonalizationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const personalization = await this.personalizationsService.update(
      +id,
      updatePersonalizationDto,
      file,
    );
    return {
      message: 'Personalização atualizada com sucesso',
      personalization,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.personalizationsService.remove(+id);
    return { message: 'Personalização excluída' };
  }
}
