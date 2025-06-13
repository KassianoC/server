import {
  Controller,
  Post,
  Get,
  Patch,
  Put,
  Param,
  Body,
  UseInterceptors,
  // UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { putPasswordDto } from './dto/put-password.dto'; // Corrigido o nome do DTO para seguir convenção

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('photo')) // Intercepta o campo 'photo' como arquivo
  async create(
    // @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    console.log('Dados recebidos no body:', body);
    // console.log('Arquivo recebido:', file);

    // Passa os dados e o arquivo para o serviço
    await this.userService.create(body);
    // await this.userService.create(body, file);
    return { message: 'Usuário criado com sucesso' };
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.findOne(userId);
  }

  @Patch('patch/:id') // Mantém o endpoint consistente com o frontend
  @UseInterceptors(FileInterceptor('photo')) // Intercepta o campo 'photo' como arquivo
  async update(
    @Param('id') id: string,
    // @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: CreateUserDto,
  ) {
    const userId = parseInt(id);
    console.log('Dados recebidos no body:', updateUserDto);
    // console.log('Arquivo recebido:', file);

    // Passa os dados e o arquivo para o serviço
    await this.userService.update(userId, updateUserDto);
    //await this.userService.update(userId, updateUserDto, file);
    return { message: 'Usuário atualizado com sucesso' };
  }

  @Put('putpassword/:id')
  async putPassword(
    @Param('id') id: string,
    @Body() putPasswordDto: putPasswordDto,
  ) {
    const userId = parseInt(id);
    await this.userService.putPassword(userId, putPasswordDto.password);
    return { message: 'Senha atualizada com sucesso' };
  }
}
