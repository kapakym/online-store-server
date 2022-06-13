import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductBrand } from 'src/product-brand/product-brand.model';
import { ProductType } from './product-type.model';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

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

  @ForeignKey(() => ProductType)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  brandId: number;
}
