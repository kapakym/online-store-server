import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { ProductType } from './product-type.model';

@Injectable()
export class ProductTypeService {
  // Инжектируем в сервис модель таблицы с которой будем работать
  constructor(
    @InjectModel(ProductType) private productTypeRepository: typeof ProductType,
  ) {}
  async createProductType(dto: CreateProductTypeDto) {
    const productType = await this.productTypeRepository.create(dto);
    return productType;
  }
}
