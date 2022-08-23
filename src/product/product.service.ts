import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductInfo } from './product.info.model';
import { ProductPicture } from './product.picture.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(ProductInfo) private productInfoRepository: typeof ProductInfo,
    @InjectModel(ProductPicture)
    private productPictureRepository: typeof ProductPicture,
    private fileService: FilesService,
  ) {}
}
