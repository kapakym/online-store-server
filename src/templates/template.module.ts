import { Module } from '@nestjs/common';
import { TemplateContorller } from './template.contorller';
import { TemlateService } from './template.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Template } from './template.model';
import { Property } from './property.model';

@Module({
  controllers: [TemplateContorller],
  providers: [TemlateService],
  // Импортировал в модуль модели для работы с Шаблонами и Свойствами
  imports: [SequelizeModule.forFeature([Template, Property])],
})
export class TemplateModule {}
