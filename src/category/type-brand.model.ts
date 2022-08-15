import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { Brand } from '../brand/brand.model';

@Table({ tableName: 'brand_type', createdAt: false, updatedAt: false })
export class TypeBrand extends Model<TypeBrand> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
  })
  brandId: number;
}
