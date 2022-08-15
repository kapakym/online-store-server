import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductBrandDto } from './dto/create-productBrand.dto';
import { BrandService } from './brand.service';
import { DeleteProductBrandDto } from './dto/delete-productBrand.dto';
import { Category } from '../category/category.model';
import { ChangePictureProductBrandDto } from './dto/change-picture-productBrand.dto';
import { UpdateProductBrandDto } from './dto/update-productBrand.dto';
import { BrandByPageDto } from './dto/get-brand-by-page.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Brand } from './brand.model';

@ApiTags('Производители товаров')
@Controller('brand')
export class BrandController {
  // Инжектируем сервис с которым будем работать
  constructor(private serviceProductBrand: BrandService) {}

  @ApiOperation({ summary: 'Добавление нового производителя' })
  @ApiResponse({ status: 200, type: Brand })
  //   @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@Body() dto: CreateProductBrandDto, @UploadedFile() picture) {
    return this.serviceProductBrand.createProductBrand(dto, picture);
  }

  @ApiOperation({
    summary: 'Получение определенной страницы с производителями',
  })
  @ApiResponse({ status: 200, type: Brand })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/page')
  getByPage(@Query() dto: BrandByPageDto) {
    return this.serviceProductBrand.getBrandByPage(dto);
  }

  @ApiOperation({
    summary: 'Получение всех производителей',
  })
  @ApiResponse({ status: 200, type: Brand })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.serviceProductBrand.getAllBrand();
  }

  @ApiOperation({ summary: 'Удаление производителя товара' })
  @ApiResponse({ status: 200, type: Brand })
  // @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/delete')
  delete(@Body() dto: DeleteProductBrandDto) {
    return this.serviceProductBrand.deleteProductBrand(dto);
  }

  @ApiOperation({ summary: 'Изменение имени производителя товаров' })
  @ApiResponse({ status: 200, type: Brand })
  //   @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/update')
  update(@Body() dto: UpdateProductBrandDto) {
    return this.serviceProductBrand.updateProductBrand(dto);
  }

  @ApiOperation({ summary: 'Изменение логотипа производителя' })
  @ApiResponse({ status: 200, type: Category })
  //   @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/change-picture')
  @UseInterceptors(FileInterceptor('picture'))
  changePicture(
    @Body() dto: ChangePictureProductBrandDto,
    @UploadedFile() picture,
  ) {
    return this.serviceProductBrand.changePictureProductBrand(dto, picture);
  }
}
