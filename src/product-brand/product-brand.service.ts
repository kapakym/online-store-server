import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { ProductBrand } from './product-brand.model';

@Injectable()
export class ProductBrandService {
  // Инжектируем модель
  constructor(
    @InjectModel(ProductBrand) private productBrandRepo: typeof ProductBrand,
    private fileService: FilesService,
  ) {}

  async createProductBrand(dto: CreateProductBrandDto, picture: any) {
    const filename = await this.fileService.createFile(picture);
    const productBrand = await this.productBrandRepo.create({
      ...dto,
      picture: filename,
    });
    return productBrand;
  }

  async getAllBrand() {
    const result = await this.productBrandRepo.findAll({});
    console.log(result);
    return result;
  }
}
