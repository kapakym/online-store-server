import { Injectable } from '@nestjs/common';
import { Template } from './template.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class TemlateService {
  constructor(
    @InjectModel(Template) private templateRepository: typeof Template,
  ) {}

  async createTemplate(dto: CreateTemplateDto) {
    const template = await this.templateRepository.create(dto);
    return template;
  }

  async getAllTemplates() {
    const templates = await this.templateRepository.findAll();
    return templates;
  }
}
