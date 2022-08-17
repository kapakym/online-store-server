import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplatePropertyDto {
  @ApiProperty({ example: 'Высота (м)', description: 'Имя свойства товара' })
  readonly name: string;
  @ApiProperty({
    example: 'number',
    description: 'Тип свойства - число (number) или строка (string)',
  })
  readonly type: string;
  @ApiProperty({ example: '1', description: 'id шаблона' })
  templateId: number;
}
