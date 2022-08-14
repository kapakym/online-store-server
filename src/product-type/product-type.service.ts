import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ChangePictureProductTypeDto } from './dto/change-picture-productType.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { DeleteProductTypeDto } from './dto/delete-productType.dto';
import { UpdateProductType } from './dto/update-productType.dto';
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
    const productType: ProductType = await this.productTypeRepository.findOne({
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
    const productType: ProductType = await this.productTypeRepository.findOne({
      where: { id: dto.id },
    });
    await productType.destroy();
    return { status: 'deleted' };
  }

  async updateProductType(dto: UpdateProductType) {
    const productType: ProductType = await this.productTypeRepository.findOne({
      where: { id: dto.id },
    });
    productType.name = dto.name;
    productType.parentId = dto.parentId;
    productType.save();
    return { status: 'ok' };
  }

  async remove(id: number) {
    try {
      const productType: any = await this.productTypeRepository.findOne({
        where: { id: id },
      });
      console.log('productType', id, productType);
      const types: any = await this.productTypeRepository.findAll({
        where: { parentId: id },
        // include: { all: true },
      });
      console.log(productType);
      this.fileService.removeFile(productType.picture);
      const removeProductType = await this.productTypeRepository.destroy({
        where: { id: id },
      });

      // await productType.destroy();
      types.forEach((element) => {
        console.log(element.id, element.name);
        this.remove(element.id);
      });
    } catch (error) {
      console.log('ERROR', error);
    }

    // types
    // console.log(types);
  }
}
