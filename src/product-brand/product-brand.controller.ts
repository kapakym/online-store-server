import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { ProductBrand } from './product-brand.model';
import { ProductBrandService } from './product-brand.service';

@ApiTags('Производители товаров')
@Controller('product-brand')
export class ProductBrandController {
  // Инжектируем сервис с которым будем работать
  constructor(private serviceProductBrand: ProductBrandService) {}

  @ApiOperation({ summary: 'Добавление нового производителя' })
  @ApiResponse({ status: 200, type: ProductBrand })
  //   @UsePipes(ValidationPipe)
  @Post()
  create(@Body() productBrandDto: CreateProductBrandDto) {
    return this.serviceProductBrand.createProductBrand(productBrandDto);
  }
}
