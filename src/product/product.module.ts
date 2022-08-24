import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductInfo } from './product.info.model';
import { ProductPicture } from './product.picture.model';
import { FilesModule } from '../files/files.module';
import { Property } from '../templates/property.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductInfo,
      ProductPicture,
      Property,
    ]),
    FilesModule,
  ],
})
export class ProductModule {}
