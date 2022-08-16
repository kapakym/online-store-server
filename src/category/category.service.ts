import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ChangePictureProductTypeDto } from './dto/change-picture-productType.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { DeleteProductTypeDto } from './dto/delete-productType.dto';
import { UpdateProductType } from './dto/update-productType.dto';
import { Category } from './category.model';
import { AnswerProductType } from './types/product-type.types';

@Injectable()
export class CategoryService {
  // Инжектируем в сервис модель таблицы с которой будем работать
  constructor(
    @InjectModel(Category) private productTypeRepository: typeof Category,
    private fileService: FilesService,
  ) {}

  async createProductType(dto: CreateProductTypeDto, picture: any) {
    const filename = await this.fileService.createFile(picture);
    const productType = await this.productTypeRepository.create({
      ...dto,
      parentId: dto.parentId,
      picture: filename,
    });
    console.log(productType);
    return productType;
  }

  async changePictureProductType(
    dto: ChangePictureProductTypeDto,
    picture: any,
  ) {
    const filename = await this.fileService.createFile(picture);
    const productType: Category = await this.productTypeRepository.findOne({
      where: { id: dto.id },
    });
    await this.fileService.removeFile(productType.picture);
    productType.picture = filename;
    console.log(filename);
    await productType.save();
    return { picture: productType.picture };
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

  async deleteProductType(dto: DeleteProductTypeDto) {
    await this.remove(dto.id);
    return { status: 'deleted' };
  }

  async updateProductType(dto: UpdateProductType) {
    const productType: Category = await this.productTypeRepository.findOne({
      where: { id: dto.id },
    });
    productType.name = dto.name;
    productType.parentId = dto.parentId;
    await productType.save();
    return { status: 'ok' };
  }

  async remove(id: number) {
    try {
      const productType: any = await this.productTypeRepository.findOne({
        where: { id: id },
      });
      const types: any = await this.productTypeRepository.findAll({
        where: { parentId: id },
      });
      await this.fileService.removeFile(productType.picture);
      await productType.destroy();
      for (const element of types) {
        await this.remove(element.id);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  }
}
