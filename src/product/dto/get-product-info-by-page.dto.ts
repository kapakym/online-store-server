import { ApiProperty } from '@nestjs/swagger';

export class GetProductInfoByPageDto {
  @ApiProperty({
    example: '1',
    description: 'Номер страницы',
  })
  readonly page: number;
  @ApiProperty({
    example: '10',
    description: 'Количество продуктов на странице',
  })
  readonly limit: number;
  @ApiProperty({
    example: '1',
    description: 'ID продукта',
  })
  readonly productId: number;
}
