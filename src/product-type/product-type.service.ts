import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { ProductType } from './product-type.model';
import { AnswerProductType } from './types/product-type.types';

@Injectable()
export class ProductTypeService {
  // Инжектируем в сервис модель таблицы с которой будем работать
  constructor(
    @InjectModel(ProductType) private productTypeRepository: typeof ProductType,
    private fileService: FilesService,
  ) {}

  async createProductType(dto: CreateProductTypeDto, picture: any) {
    const filename = await this.fileService.createFile(picture);
    console.log(dto);
    const productType = await this.productTypeRepository.create({
      ...dto,
      parentId: dto.parentId == 0 ? null : dto.parentId,
      picture: filename,
    });
    console.log(productType);
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
