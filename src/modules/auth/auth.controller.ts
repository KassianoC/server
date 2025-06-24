import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    return this.authService.login(user);
  }

  // Novo endpoint para restaurar o usuário logado com base no token
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req) {
    // O usuário já está disponível em req.user graças ao JwtStrategy
    const { id, name, email, role } = req.user;
    return { id, name, email, role };
  }
}
