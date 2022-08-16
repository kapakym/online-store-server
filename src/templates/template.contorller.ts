import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TemlateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { CreateTemplatePropertysDto } from './dto/create-template-propertys.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetTemplateByPageDto } from './dto/get-template-by-page.dto';

@Controller('/template')
export class TemplateContorller {
  constructor(private templateService: TemlateService) {}

  @ApiOperation({ summary: 'Создание шаблона' })
  @ApiResponse({ status: 200, type: CreateTemplateDto })
  @Post()
  create(@Body() dto: CreateTemplateDto) {
    return this.templateService.createTemplate(dto);
  }

  @ApiOperation({ summary: 'Создание свойств' })
  @ApiResponse({ status: 200, type: CreateTemplatePropertysDto })
  @Post('/property')
  cretaeProperty(@Body() dto: CreateTemplatePropertysDto) {
    return this.templateService.createProperty(dto);
  }

  @ApiOperation({ summary: 'Получения определенного количества шаблонов' })
  @ApiResponse({ status: 200, type: CreateTemplatePropertysDto })
  @Get('/page')
  getTemplatesByPage(@Query() dto: GetTemplateByPageDto) {
    return this.templateService.getTemplatesByPage(dto);
  }

  @Get()
  getAll() {
    return this.templateService.getAllTemplates();
  }
}
