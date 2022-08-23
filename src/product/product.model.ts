import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'product' })
export class Product extends Model<Product> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный индетефикатор товарав СУБД',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  @ApiProperty({
    example: 'Ель',
    description: 'Название товара',
  })
  @Column({ type: DataType.STRING })
  name: string;
  @ApiProperty({
    example: '2000',
    description: 'Цена товара',
  })
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({ type: DataType.INTEGER })
  @ApiProperty({
    example: '100',
    description: 'Количество товара на складе',
  })
  count: number;
  @Column({ type: DataType.INTEGER })
  @ApiProperty({
    example: '11',
    description: 'Идентификатор производителя товара',
  })
  brandId: number;
  @Column({ type: DataType.INTEGER })
  @ApiProperty({
    example: '11',
    description: 'Индентификатор категории товара',
  })
  categoryId: number;
  @ApiProperty({
    example: '123221',
    description: 'Штрихкод товара',
  })
  @Column({ type: DataType.INTEGER })
  barcode: string;
}
