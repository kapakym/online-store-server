import { ApiProperty } from '@nestjs/swagger';

export class GetTemplateByPageDto {
  @ApiProperty({ example: '1', description: 'Номер страницы' })
  page: number;
  @ApiProperty({
    example: '10',
    description: 'Количество элементов на странице',
  })
  limit: number;
}
