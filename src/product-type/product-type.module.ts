import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { ProductType } from './product-type.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ProductTypeService],
  controllers: [ProductTypeController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([ProductType]),
  ],
})
export class ProductTypeModule {}
