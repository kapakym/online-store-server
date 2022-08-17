import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Высота (м)', description: 'Имя свойства товара' })
  readonly name;
}
