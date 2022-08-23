import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'product-picture' })
export class ProductPicture extends Model<ProductPicture> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный индетефикатор фототоваров в СУБД',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  @ApiProperty({
    example: '12',
    description: 'Уникальный индетефикатор товара, которому принадлежит фото',
  })
  @Column({ type: DataType.INTEGER })
  productId: number;
  @ApiProperty({ example: '/photo.jpg', description: 'Имя файла на сервере' })
  @Column({ type: DataType.STRING, unique: true })
  filename: string;
}
