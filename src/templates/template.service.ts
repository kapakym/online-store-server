import { Injectable } from '@nestjs/common';
import { Template } from './template.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Property } from './property.model';
import { GetTemplateByPageDto } from './dto/get-template-by-page.dto';
import { GetPropertyByPageDto } from './dto/get-property-by-page.dto';
import { CreateTemplatePropertyDto } from './dto/create-template-property.dto';

@Injectable()
export class TemlateService {
  constructor(
    @InjectModel(Template) private templateRepository: typeof Template,
    @InjectModel(Property) private propertyRepository: typeof Property,
  ) {}

  async createTemplate(dto: CreateTemplateDto) {
    const template = await this.templateRepository.create(dto);
    return template;
  }

  async getAllTemplates() {
    const templates = await this.templateRepository.findAll();
    return templates;
  }

  async createProperty(dto: CreateTemplatePropertyDto) {
    const property = await this.propertyRepository.create(dto);
    return { message: 'OK' };
  }

  async getTemplatesByPage(dto: GetTemplateByPageDto) {
    const count = await this.templateRepository.count();
    const templates = await this.templateRepository.findAll({
      include: { all: true },
      limit: dto.limit,
      offset: dto.limit * dto.page,
      order: [['name', 'ASC']],
    });
    return { templates, count };
  }

  async getPropertyByPage(dto: GetPropertyByPageDto) {
    const count = await this.propertyRepository.count({
      where: { templateId: dto.templateId },
    });
    const templates = await this.propertyRepository.findAll({
      where: { templateId: dto.templateId },
      include: { all: true },
      limit: dto.limit,
      offset: dto.limit * dto.page,
      order: [['name', 'ASC']],
    });
    return { templates, count };
  }
}
