import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personalizations } from './entities/personalization.entity';
import { CreatePersonalizationDto } from './dto/create-personalization.dto';
import { UpdatePersonalizationDto } from './dto/update-personalization.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersonalizationsService {
  private readonly uploadDir = path.join(
    __dirname,
    '../../../public/uploads/personalizations',
  );

  constructor(
    @InjectRepository(Personalizations)
    private readonly personalizationRepository: Repository<Personalizations>,
  ) {
    // Criar pasta de uploads se não existir
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(
    createPersonalizationDto: CreatePersonalizationDto,
    file: Express.Multer.File,
  ): Promise<Personalizations> {
    console.log('Raw input data:', createPersonalizationDto);
    console.log('File received:', file);

    // Validar e converter tipos de dados
    let userId = createPersonalizationDto.user_id;
    if (
      userId === undefined ||
      userId === null ||
      userId === '' ||
      isNaN(Number(userId))
    ) {
      userId = null; // Define como null se inválido ou ausente
    } else {
      userId = Number(userId);
      if (userId <= 0) {
        throw new BadRequestException('user_id inválido');
      }
    }
    const bookId = Number(createPersonalizationDto.book_id);
    const age = Number(createPersonalizationDto.age);

    if (isNaN(bookId) || bookId <= 0) {
      throw new BadRequestException('book_id inválido ou ausente');
    }
    if (isNaN(age) || age <= 0) {
      throw new BadRequestException('age inválido ou ausente');
    }

    // Adicionar o nome do arquivo ao DTO
    const photoName = file ? file.filename : null;
    if (!photoName) {
      throw new BadRequestException('A imagem é obrigatória');
    }

    const personalizationData = {
      user_id: userId,
      book_id: bookId,
      person_name: createPersonalizationDto.person_name,
      language: createPersonalizationDto.language,
      age: age,
      gender: createPersonalizationDto.gender,
      photo: photoName,
    };

    console.log('Prepared data to save:', personalizationData);

    try {
      const personalization =
        this.personalizationRepository.create(personalizationData);
      const savedPersonalization =
        await this.personalizationRepository.save(personalization);
      console.log('Personalization saved:', savedPersonalization);
      return savedPersonalization;
    } catch (error) {
      console.error('Error saving personalization:', error);
      throw new BadRequestException(
        `Erro ao salvar personalização: ${error.message}`,
      );
    }
  }

  async findAll() {
    return await this.personalizationRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const personalization = await this.personalizationRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    if (!personalization) {
      throw new NotFoundException(`Personalization #${id} não encontrada`);
    }
    return personalization;
  }

  async update(
    id: number,
    updatePersonalizationDto: UpdatePersonalizationDto,
    file: Express.Multer.File,
  ): Promise<Personalizations> {
    console.log('Updating personalization with ID:', id);
    console.log('With data:', updatePersonalizationDto);
    console.log('File received:', file);

    const personalization = await this.findOne(id);

    let photoName = personalization.photo;
    if (file) {
      const uploadPath = path.join(this.uploadDir, file.filename);
      if (!fs.existsSync(uploadPath)) {
        throw new BadRequestException('Erro ao salvar a nova foto');
      }
      if (personalization.photo) {
        const oldPhotoPath = path.join(this.uploadDir, personalization.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      photoName = file.filename;
    }

    const updatedData = {
      ...updatePersonalizationDto,
      photo: photoName,
    };

    Object.assign(personalization, updatedData);
    return this.personalizationRepository.save(personalization);
  }

  async remove(id: number): Promise<void> {
    const personalization = await this.findOne(id);

    if (personalization.photo) {
      const photoPath = path.join(this.uploadDir, personalization.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await this.personalizationRepository.remove(personalization);
  }
}
