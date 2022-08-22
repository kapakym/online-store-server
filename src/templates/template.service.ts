import { CreateTemplatePropertysDto } from './dto/create-template-propertys.dto';
import { Injectable } from '@nestjs/common';
import { Template } from './template.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Property } from './property.model';
import { GetTemplateByPageDto } from './dto/get-template-by-page.dto';
import { GetPropertyByPageDto } from './dto/get-property-by-page.dto';
import { DeletePropertyDto } from './dto/deleteProperty.dto';
import { DeleteTemplateDto } from './dto/delete-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

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

  async createProperty(dto: CreateTemplatePropertysDto) {
    console.log(dto);
    for (const item of dto.data) {
      switch (item.exist) {
        case 'new':
          await this.propertyRepository.create({
            templateId: dto.templateId,
            name: item.name,
            type: item.type,
          });
          break;
        case 'exist':
          const property = await this.propertyRepository.findByPk(item.id);
          property.name = item.name;
          property.type = item.type;
          await property.save();
          break;
        default: {
          break;
        }
      }
    }
    // const property = await this.propertyRepository.create(dto);
    // return property;
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
    const propertys = await this.propertyRepository.findAll({
      where: { templateId: dto.templateId },
      include: { all: true },
      limit: dto.limit,
      offset: dto.limit * dto.page,
      order: [['name', 'ASC']],
    });
    return { propertys, count };
  }

  async deleteProperty(dto: DeletePropertyDto) {
    const property = await this.propertyRepository.findByPk(dto.id);
    await property.destroy();
    return { message: 'ok' };
  }

  async deleteTemplate(dto: DeleteTemplateDto) {
    const template = await this.templateRepository.findByPk(dto.id);
    await template.destroy();
    const propertys = await this.propertyRepository.findAll({
      where: { templateId: dto.id },
    });
    for (const property of propertys) await property.destroy();
    return { message: 'ok' };
  }

  async updateTemplate(dto: UpdateTemplateDto) {
    const template = await this.templateRepository.findByPk(dto.id);
    template.name = dto.name;
    template.save();
    return { message: 'ok' };
  }
}
