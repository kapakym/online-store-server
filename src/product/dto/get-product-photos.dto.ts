import { ApiProperty } from '@nestjs/swagger';

export class GetProductPhotosDto {
  @ApiProperty({
    example: '1',
    description: 'ID продукта',
  })
  readonly productId: number;
}
