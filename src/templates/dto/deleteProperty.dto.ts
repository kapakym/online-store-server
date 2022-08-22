import { ApiProperty } from '@nestjs/swagger';

export class DeletePropertyDto {
  @ApiProperty({ example: '1', description: 'id удаляемого свойства' })
  readonly id: number;
}
