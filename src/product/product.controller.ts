import {
  Body,
  Controller,
  Get,
  Post,
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

  @ApiOperation({ summary: 'Получение опредленного количества продуктов' })
  @ApiResponse({ status: 200, type: GetProductByPageDto })
  @Get('/page')
  getProductByPage(@Query() dto: GetProductByPageDto) {
    return this.productService.getProductByPage(dto);
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
