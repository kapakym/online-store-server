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
import { Col } from 'sequelize/types/utils';
import { ProductBrand } from 'src/product-brand/product-brand.model';
import { Products } from 'src/products/products.model';
import { User } from 'src/users/users.model';
import { TypeBrand } from './type-brand.model';

interface ProductTypeCtreationAttrs {
  name: string;
}

@Table({ tableName: 'product_type' })
export class ProductType extends Model<ProductType, ProductTypeCtreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Деревья',
    description: 'Названия категории товара',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Products)
  products: Products;

  @BelongsToMany(() => ProductBrand, () => TypeBrand)
  productBrand: ProductBrand[];
}
