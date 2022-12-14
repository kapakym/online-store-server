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
import { ChangePictureProductTypeDto } from './dto/change-picture-productType.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { DeleteProductTypeDto } from './dto/delete-productType.dto';
import { UpdateProductType } from './dto/update-productType.dto';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@ApiTags('Категории товаров')
@Controller('category')
export class CategoryController {
  // Инжектируем сервис для работы с категориями товаров
  constructor(private serviceProductType: CategoryService) {}

  @ApiOperation({ summary: 'Создание категории товара' })
  @ApiResponse({ status: 200, type: Category })
  //   @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@Body() productDto: CreateProductTypeDto, @UploadedFile() picture) {
    return this.serviceProductType.createProductType(productDto, picture);
  }

  @ApiOperation({ summary: 'Изменение картинки категории' })
  @ApiResponse({ status: 200, type: Category })
  //   @UsePipes(ValidationPipe)
  @Post('/change-picture')
  @UseInterceptors(FileInterceptor('picture'))
  changePicture(
    @Body() productDto: ChangePictureProductTypeDto,
    @UploadedFile() picture,
  ) {
    return this.serviceProductType.changePictureProductType(
      productDto,
      picture,
    );
  }

  @ApiOperation({ summary: 'Изменение названия категории и ее родителя' })
  @ApiResponse({ status: 200, type: Category })
  //   @UsePipes(ValidationPipe)
  @Post('/update')
  updateCategory(@Body() dto: UpdateProductType) {
    return this.serviceProductType.updateProductType(dto);
  }

  @ApiOperation({ summary: 'Получить все категории товаров' })
  @ApiResponse({ status: 200, type: [Category] })
  // @UseGuards(JwtAuthGuard)
  //   @Roles('ADMIN')
  //   @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.serviceProductType.getAllTypes();
  }

  @ApiOperation({ summary: 'Удаление категории товара' })
  @ApiResponse({ status: 200, type: Category })
  //   @UsePipes(ValidationPipe)
  @Post('/delete')
  delete(@Body() productDto: DeleteProductTypeDto) {
    return this.serviceProductType.deleteProductType(productDto);
  }
}
