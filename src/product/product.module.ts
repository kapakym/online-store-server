import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductInfo } from './product.info.model';
import { ProductPicture } from './product.picture.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product, ProductInfo, ProductPicture]),
    FilesModule,
  ],
})
export class ProductModule {}
