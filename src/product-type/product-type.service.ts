import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { ProductType } from './product-type.model';
import { AnswerProductType } from './types/product-type.types';

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

  async getAllTypes() {
    const types: any = await this.productTypeRepository.findAll({});
    const answer: AnswerProductType[] = [];
    types.forEach((element: AnswerProductType) => {
      answer.push({
        id: element.id,
        name: element.name,
        parentId: element.parentId,
        picture: element.picture,
      });
    });
    return answer;
  }
}
