import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

@Table({ tableName: 'product_raiting' })
export class ProductRaiting extends Model<ProductRaiting> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'SONY',
    description: 'Названия производителя товара',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  rate: number;
}
