import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { UserModule } from './modules/user/user.module';
import { PersonalizationsModule } from './modules/personalizations/personalizations.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PersonalizationsModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    OrderItemsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
