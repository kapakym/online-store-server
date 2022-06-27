import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { ProductType } from './product-type.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ProductTypeService],
  controllers: [ProductTypeController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([ProductType]),
    FilesModule,
  ],
})
export class ProductTypeModule {}
