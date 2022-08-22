import { ApiProperty } from '@nestjs/swagger';

export class UpdateTemplateDto {
  @ApiProperty({ example: '1', description: 'id шаблона' })
  readonly id: number;
  @ApiProperty({ example: 'Деревья', description: 'Название шблона' })
  readonly name: string;
}
