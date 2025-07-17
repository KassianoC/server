import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalizationsService } from './personalizations.service';
import { PersonalizationsController } from './personalizations.controller';
import { Personalizations } from './entities/personalization.entity';
import { Product } from '../products/entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personalizations, Product]), // Inclui Product para validation
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads/personalizations', // Alinha com o serviço
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PersonalizationsController],
  providers: [PersonalizationsService],
  exports: [PersonalizationsService], // Mantém a exportação do serviço
})
export class PersonalizationsModule {}
