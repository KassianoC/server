import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ReturnUserDto } from './dto/retorn-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      language: createUserDto.language as any,
    });
    await this.userRepository.save(user);
    return user;
  }

  async findOne(id: number): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return new ReturnUserDto(user);
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find({
      where: { role: UserRole.USER },
    });
    return users.map(user => new ReturnUserDto(user));
  }

  async update(id: number, updateUserDto: PatchUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    const existingEmail = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });

    if (existingEmail && user.email !== updateUserDto.email) {
      throw new ConflictException('Email já existe');
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    return user;
  }

  async putPassword(id: number, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.updated_at = new Date();

    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
