import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductInfo } from './product.info.model';
import { ProductPicture } from './product.picture.model';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Property } from '../templates/property.model';
import { GetProductByPageDto } from './dto/get-product-by-page.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(ProductInfo) private productInfoRepository: typeof ProductInfo,
    @InjectModel(ProductPicture)
    private productPictureRepository: typeof ProductPicture,
    @InjectModel(Property) private propertyRepository: typeof Property,
    private fileService: FilesService,
  ) {}

  async getProductByPage(dto: GetProductByPageDto) {
    const count = await this.productRepository.count();
    const data = [];

    const products = await this.productRepository.findAll({
      include: { all: true },
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
      order: [['name', 'ASC']],
    });
    console.log('====================>', dto, count);
    for (const product of products) {
      const photos = await this.productPictureRepository.findAll({
        where: { productId: product.id },
        attributes: ['filename'],
      });
      const productJSON = product.toJSON();
      productJSON['photos'] = [];
      for (const item of photos) {
        productJSON['photos'].push(item.filename);
      }
      data.push(productJSON);
    }
    return { data, count };
  }

  async createProduct(dto: CreateProductDto, photo: any) {
    const product = await this.productRepository.create(dto);
    for (const item of photo) {
      const filename = await this.fileService.createFile(item);
      console.log(filename);
      const newPhoto = await this.productPictureRepository.create({
        productId: product.id,
        filename: filename,
      });
    }
    const propertys = await this.propertyRepository.findAll({
      where: { templateId: dto.templateId },
    });
    for (const item of propertys) {
      console.log('item----->', item.name);
      const newInfo = await this.productInfoRepository.create({
        productId: product.id,
        name: item.name,
        type: item.type,
      });
    }

    // for (const item in photo) console.log(item.name);
  }
}
