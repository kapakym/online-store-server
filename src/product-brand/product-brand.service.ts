import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { ProductBrand } from './product-brand.model';

@Injectable()
export class ProductBrandService {
  // Инжектируем модель
  constructor(
    @InjectModel(ProductBrand) private productBrandRepo: typeof ProductBrand,
  ) {}

  async createProductBrand(dto: CreateProductBrandDto) {
    const productBrand = await this.productBrandRepo.create(dto);
    return productBrand;
  }
}
