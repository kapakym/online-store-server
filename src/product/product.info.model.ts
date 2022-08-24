import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'product-info' })
export class ProductInfo extends Model<ProductInfo> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентефикатор свойства товара',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Индетификатор продукта, которому принадлежит данное свойство',
  })
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ApiProperty({
    example: 'строка',
    description: 'Тип свойства [строка, число, ссылка]',
  })
  @Column({
    type: DataType.STRING,
  })
  type: string;
  @ApiProperty({
    example: 'Высота (м)',
    description: 'Имя свойства',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({
    example: '100',
    description: 'Значение свойства',
  })
  @Column({
    type: DataType.STRING,
  })
  value: string;
}
