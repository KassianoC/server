import { Controller, Post, Body, Param, Get, Patch, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { putPasswordDto } from './dto/put-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { message: 'Usuário criado com sucesso' };
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.findOne(userId);
  }

  @Patch('patch/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const userId = parseInt(id);
    await this.userService.update(userId, updateUserDto);
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
