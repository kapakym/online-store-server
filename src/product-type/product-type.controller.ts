import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto } from './dto/create-productType.dto';
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
  create(@Body() productDto: CreateProductTypeDto) {
    return this.serviceProductType.createProductType(productDto);
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
}
