import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetProductByPageDto } from './dto/get-product-by-page.dto';
import { GetProductInfoByPageDto } from './dto/get-product-info-by-page.dto';
import { ChangeTemplateProductDto } from './dto/change-template-product.dto';
import { ChangeInfoProductDto } from './dto/change-info-product.dto';
import { ChangeProductDto } from './dto/change-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { DeleteProductPhotoDto } from './dto/delete-product-photo.dto';
import { GetProductPhotosDto } from './dto/get-product-photos.dto';
import { CreateProductPhotosDto } from './dto/create-product-photos.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Добавление продукта' })
  @ApiResponse({ status: 200, type: CreateProductDto })
  @Post()
  @UseInterceptors(FilesInterceptor('photo'))
  create(@Body() dto: any, @UploadedFiles() photo) {
    console.log(dto, photo.length);
    return this.productService.createProduct(dto, photo);
  }

  @ApiOperation({ summary: 'Добавление фотографий продукта' })
  @ApiResponse({ status: 200, type: CreateProductPhotosDto })
  @Post('photo')
  @UseInterceptors(FilesInterceptor('photo'))
  Photos(@Body() dto: any, @UploadedFiles() photo) {
    return this.productService.createProductPhoto(dto, photo);
  }

  @ApiOperation({ summary: 'Изменение используемого шаблона у продукта' })
  @ApiResponse({ status: 200, type: ChangeTemplateProductDto })
  @Put('/template')
  changeTemplate(@Body() dto: ChangeTemplateProductDto) {
    return this.productService.changeTemplateProduct(dto);
  }

  @ApiOperation({ summary: 'Изменение продукта' })
  @ApiResponse({ status: 200, type: ChangeProductDto })
  @Put()
  changeProduct(@Body() dto: ChangeProductDto) {
    return this.productService.changeProduct(dto);
  }

  @ApiOperation({ summary: 'Изменение характеристик у продукта' })
  @ApiResponse({ status: 200, type: ChangeInfoProductDto })
  @Put('/info')
  changeInfo(@Body() dto: ChangeInfoProductDto) {
    return this.productService.changeInfoProduct(dto);
  }

  @ApiOperation({ summary: 'Получение опредленного количества продуктов' })
  @ApiResponse({ status: 200, type: GetProductPhotosDto })
  @Get('/photo')
  getProductPhotos(@Query() dto: GetProductPhotosDto) {
    return this.productService.getProductPhotos(dto);
  }

  @ApiOperation({ summary: 'Получение опредленного количества продуктов' })
  @ApiResponse({ status: 200, type: GetProductByPageDto })
  @Get('/page')
  getProductByPage(@Query() dto: GetProductByPageDto) {
    return this.productService.getProductByPage(dto);
  }

  @ApiOperation({ summary: 'Удаление опредленного продукта' })
  @ApiResponse({ status: 200, type: DeleteProductPhotoDto })
  @Delete('photo')
  deleteProductPhoto(@Query() dto: DeleteProductPhotoDto) {
    return this.productService.deleteProductPhoto(dto);
  }

  @ApiOperation({ summary: 'Удаление фото продукта' })
  @ApiResponse({ status: 200, type: DeleteProductDto })
  @Delete()
  deleteProduct(@Query() dto: DeleteProductDto) {
    return this.productService.deleteProduct(dto);
  }

  @ApiOperation({
    summary: 'Получение опредленного количества свойств продукта',
  })
  @ApiResponse({ status: 200, type: GetProductInfoByPageDto })
  @Get('/info/page')
  getProductPropertyByPage(@Query() dto: GetProductInfoByPageDto) {
    return this.productService.getProductInfoByPage(dto);
  }
}
