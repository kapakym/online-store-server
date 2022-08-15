import { Body, Controller, Get, Post } from '@nestjs/common';
import { TemlateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';

@Controller('/template')
export class TemplateContorller {
  constructor(private templateService: TemlateService) {}

  @Post()
  create(@Body() dto: CreateTemplateDto) {
    return this.templateService.createTemplate(dto);
  }

  @Get()
  getAll() {
    return this.templateService.getAllTemplates();
  }
}
