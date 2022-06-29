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
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { DeleteProductTypeDto } from './dto/delete-productType.dto';
import { ProductType } from './product-type.model';
import { ProductTypeService } from './product-type.service';

@ApiTags('Категории товаров')
@Controller('product-type')
export class ProductTypeController {
  // Инжектируем сервис для работы с категориями товаров
  constructor(private serviceProductType: ProductTypeService) {}

  @ApiOperation({ summary: 'Создание категории товара' })
  @ApiResponse({ status: 200, type: ProductType })
  //   @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@Body() productDto: CreateProductTypeDto, @UploadedFile() picture) {
    return this.serviceProductType.createProductType(productDto, picture);
  }

  @ApiOperation({ summary: 'Получить все категории товаров' })
  @ApiResponse({ status: 200, type: [ProductType] })
  // @UseGuards(JwtAuthGuard)
  //   @Roles('ADMIN')
  //   @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.serviceProductType.getAllTypes();
  }

  @ApiOperation({ summary: 'Удаление категории товара' })
  @ApiResponse({ status: 200, type: ProductType })
  //   @UsePipes(ValidationPipe)
  @Post('/delete')
  delete(@Body() productDto: DeleteProductTypeDto) {
    return this.serviceProductType.deleteProductType(productDto);
  }
}
