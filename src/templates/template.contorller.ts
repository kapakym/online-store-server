import { GetPropertyByPageDto } from './dto/get-property-by-page.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TemlateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { CreateTemplatePropertysDto } from './dto/create-template-propertys.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTemplateByPageDto } from './dto/get-template-by-page.dto';
import { CreateTemplatePropertyDto } from './dto/create-template-property.dto';
import { DeletePropertyDto } from './dto/deleteProperty.dto';
import { DeleteTemplateDto } from './dto/delete-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@ApiTags('Шаблоны')
@Controller('/template')
export class TemplateContorller {
  constructor(private templateService: TemlateService) {}

  @ApiOperation({ summary: 'Создание шаблона' })
  @ApiResponse({ status: 200, type: CreateTemplateDto })
  @Post()
  create(@Body() dto: CreateTemplateDto) {
    return this.templateService.createTemplate(dto);
  }

  @ApiOperation({ summary: 'Изменение шаблона' })
  @ApiResponse({ status: 200, type: UpdateTemplateDto })
  @Put()
  update(@Body() dto: UpdateTemplateDto) {
    return this.templateService.updateTemplate(dto);
  }

  @ApiOperation({ summary: 'Удаление шаблона' })
  @ApiResponse({ status: 200, type: DeleteTemplateDto })
  @Delete('')
  deleteTemplate(@Query() dto: DeleteTemplateDto) {
    return this.templateService.deleteTemplate(dto);
  }

  @ApiOperation({ summary: 'Создание свойств' })
  @ApiResponse({ status: 200, type: CreateTemplatePropertysDto })
  @Put('/property')
  createProperty(@Body() dto: CreateTemplatePropertysDto) {
    return this.templateService.createProperty(dto);
  }

  @ApiOperation({ summary: 'Удаление свойства' })
  @ApiResponse({ status: 200, type: DeletePropertyDto })
  @Delete('/property')
  deleteProperty(@Query() dto: DeletePropertyDto) {
    return this.templateService.deleteProperty(dto);
  }

  @ApiOperation({ summary: 'Получения определенного количества шаблонов' })
  @ApiResponse({ status: 200, type: CreateTemplatePropertyDto })
  @Get('/page')
  getTemplatesByPage(@Query() dto: GetTemplateByPageDto) {
    return this.templateService.getTemplatesByPage(dto);
  }

  @ApiOperation({
    summary: 'Получения определенного количества свойств шаблона',
  })
  @ApiResponse({ status: 200, type: GetPropertyByPageDto })
  @Get('/property/page')
  getPropertyByPage(@Query() dto: GetPropertyByPageDto) {
    return this.templateService.getPropertyByPage(dto);
  }

  @ApiOperation({ summary: 'Получения всех шаблонов' })
  @ApiResponse({ status: 200 })
  @Get()
  getAll() {
    return this.templateService.getAllTemplates();
  }
}
