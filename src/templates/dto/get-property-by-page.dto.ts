import { ApiProperty } from '@nestjs/swagger';

export class GetPropertyByPageDto {
  @ApiProperty({ example: '1', description: 'id шаблона' })
  templateId: number;
  @ApiProperty({ example: '1', description: 'Номер страницы' })
  page: number;
  @ApiProperty({
    example: 'Высота (м)',
    description: 'Количество элементов на странице',
  })
  limit: number;
}
