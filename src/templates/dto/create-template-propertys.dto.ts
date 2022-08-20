import { CreateTemplatePropertyDto } from './create-template-property.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplatePropertysDto {
  readonly templateId: number;
  @ApiProperty({ example: 'Массив объектов', description: 'Массив свойств' })
  readonly propertys: Array<CreateTemplatePropertyDto>;
}
