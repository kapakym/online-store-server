import { Module } from '@nestjs/common';
import { TemplateContorller } from './template.contorller';
import { TemlateService } from './template.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Template } from './template.model';

@Module({
  controllers: [TemplateContorller],
  providers: [TemlateService],
  imports: [SequelizeModule.forFeature([Template])],
})
export class TemplateModule {}
