import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PersonalizationsModule } from './modules/personalizations/personalizations.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ProductModule, PersonalizationsModule],
})
export class AppModule {}
