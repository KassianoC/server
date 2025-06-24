import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // IMPORTAR PassportModule
import { JwtStrategy } from './jwt.strategy'; // IMPORTAR JwtStrategy

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // REGISTRA a estratégia padrão JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // REGISTRA o JwtStrategy aqui
  controllers: [AuthController],
  exports: [AuthService], // EXPORTA AuthService se precisar em outros módulos
})
export class AuthModule {}
