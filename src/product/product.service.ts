import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductInfo } from './product.info.model';
import { ProductPicture } from './product.picture.model';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Property } from '../templates/property.model';
import { GetProductByPageDto } from './dto/get-product-by-page.dto';
import { GetProductInfoByPageDto } from './dto/get-product-info-by-page.dto';
import { ChangeTemplateProductDto } from './dto/change-template-product.dto';
import { ChangeInfoProductDto } from './dto/change-info-product.dto';
import { ChangeProductDto } from './dto/change-product.dto';

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
    await this.createProductInfos(dto.templateId, product.id);
    // for (const item in photo) console.log(item.name);
  }

  async getProductInfoByPage(dto: GetProductInfoByPageDto) {
    const count = await this.productInfoRepository.count({
      where: { productId: dto.productId },
    });
    const productInfo = await this.productInfoRepository.findAll({
      where: { productId: dto.productId },
      include: { all: true },
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
      order: [['name', 'ASC']],
    });

    return { productInfo, count };
  }

  async changeTemplateProduct(dto: ChangeTemplateProductDto) {
    const result = await this.productInfoRepository.destroy({
      where: { productId: dto.productId },
    });
    const product = await this.productRepository.findByPk(dto.productId);
    product.templateId = dto.templateId;
    await product.save();
    await this.createProductInfos(dto.templateId, dto.productId);
  }

  async createProductInfos(templateId, productId) {
    const propertys = await this.propertyRepository.findAll({
      where: { templateId: templateId },
    });
    for (const item of propertys) {
      console.log('item----->', item.name);
      const newInfo = await this.productInfoRepository.create({
        productId: productId,
        name: item.name,
        type: item.type,
        templateId: templateId,
      });
    }
  }

  async changeInfoProduct(dto: ChangeInfoProductDto) {
    for (const item of dto.info) {
      const info: ProductInfo = await this.productInfoRepository.findByPk(
        item.id,
      );
      info.value = item.value;
      await info.save();
    }
  }

  async changeProduct(dto: ChangeProductDto) {
    const product: Product = await this.productRepository.findByPk(
      dto.product.id,
    );
    product.name = dto.product.name;
    product.count = dto.product.count;
    product.price = dto.product.price;
    product.categoryId = dto.product.categoryId;
    product.brandId = dto.product.brandId;
    product.barcode = dto.product.barcode;
    await product.save();
  }
}
