import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { UserModule } from './modules/user/user.module';
import { PersonalizationsModule } from './modules/personalizations/personalizations.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PersonalizationsModule,
    ProductsModule,
  ],
})
export class AppModule {}
