import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { ProductBrand } from './product-brand.model';
import { DeleteProductBrandDto } from './dto/delete-productBrand.dto';
import { ChangePictureProductBrandDto } from './dto/change-picture-productBrand.dto';
import { BrandByPageDto } from './dto/get-brand-by-page.dto';

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

  async deleteProductBrand(dto: DeleteProductBrandDto) {
    console.log(dto);
    try {
      const productBrand: any = await this.productBrandRepo.findOne({
        where: { id: dto.id },
      });
      const removeProductBrand = await this.productBrandRepo.destroy({
        where: { id: dto.id },
      });
      return { status: 'deleted' };
    } catch (error) {
      console.log(error);
    }
  }

  async changePictureProductBrand(
    dto: ChangePictureProductBrandDto,
    picture: any,
  ) {
    const filename = await this.fileService.createFile(picture);
    const productBrand: ProductBrand = await this.productBrandRepo.findOne({
      where: { id: dto.id },
    });
    await this.fileService.removeFile(productBrand.picture);
    productBrand.picture = filename;
    console.log(filename);
    await productBrand.save();
    return { picture: productBrand.picture };
  }

  async updateProductBrand(dto) {
    try {
      const productBrand: ProductBrand = await this.productBrandRepo.findOne({
        where: { id: dto.id },
      });
      if (productBrand) {
        productBrand.name = dto.name;
        productBrand.save();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getBrandByPage(param: BrandByPageDto) {
    console.log('sto', param);

    const count = await this.productBrandRepo.count();
    console.log(param.limit * param.page);
    const brands = await this.productBrandRepo.findAll({
      include: { all: true },
      limit: param.limit,
      offset: param.limit * param.page,
      order: [['name', 'ASC']],
    });
    return { brands, count };
  }
}
