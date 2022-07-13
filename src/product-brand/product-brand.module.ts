import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductBrandController } from './product-brand.controller';
import { ProductBrand } from './product-brand.model';
import { ProductBrandService } from './product-brand.service';

@Module({
  providers: [ProductBrandService],
  controllers: [ProductBrandController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([ProductBrand]),
  ],
})
export class ProductBrandModule {}