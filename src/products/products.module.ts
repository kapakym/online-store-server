import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BasketProduct } from 'src/basket-product/basket-product.model';
import sequelize from 'sequelize';
import { Products } from './products.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    // Регистрируем репозитории с которыми будет работать данный модуль
    SequelizeModule.forFeature([Products]),
  ],
})
export class ProductsModule {}
