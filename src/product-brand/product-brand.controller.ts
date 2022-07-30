import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { ProductBrand } from './product-brand.model';
import { ProductBrandService } from './product-brand.service';
import { DeleteProductBrandDto } from './dto/delete-productBrand.dto';
import { ProductType } from '../product-type/product-type.model';
import { ChangePictureProductBrandDto } from './dto/change-picture-productBrand.dto';
import { UpdateProductBrandDto } from './dto/update-productBrand.dto';

@ApiTags('Производители товаров')
@Controller('product-brand')
export class ProductBrandController {
  // Инжектируем сервис с которым будем работать
  constructor(private serviceProductBrand: ProductBrandService) {}

  @ApiOperation({ summary: 'Добавление нового производителя' })
  @ApiResponse({ status: 200, type: ProductBrand })
  //   @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(
    @Body() productBrandDto: CreateProductBrandDto,
    @UploadedFile() picture,
  ) {
    return this.serviceProductBrand.createProductBrand(
      productBrandDto,
      picture,
    );
  }

  @ApiOperation({ summary: 'Получение списка производителей' })
  @ApiResponse({ status: 200, type: ProductBrand })
  @Get()
  getAll() {
    return this.serviceProductBrand.getAllBrand();
  }

  @ApiOperation({ summary: 'Удаление производителя товара' })
  @ApiResponse({ status: 200, type: ProductBrand })
  //   @UsePipes(ValidationPipe)
  @Post('/delete')
  delete(@Body() dto: DeleteProductBrandDto) {
    return this.serviceProductBrand.deleteProductBrand(dto);
  }

  @ApiOperation({ summary: 'Изменение имени производителя товаров' })
  @ApiResponse({ status: 200, type: ProductBrand })
  //   @UsePipes(ValidationPipe)
  @Post('/update')
  delete(@Body() dto: UpdateProductBrandDto) {
    return this.serviceProductBrand.updateProductBrand(dto);
  }

  @ApiOperation({ summary: 'Изменение логотипа производителя' })
  @ApiResponse({ status: 200, type: ProductType })
  //   @UsePipes(ValidationPipe)
  @Post('/change-picture')
  @UseInterceptors(FileInterceptor('picture'))
  changePicture(
    @Body() dto: ChangePictureProductBrandDto,
    @UploadedFile() picture,
  ) {
    return this.serviceProductBrand.changePictureProductBrand(dto, picture);
  }
}
