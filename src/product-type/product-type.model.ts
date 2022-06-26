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

  @ApiProperty({
    example: './test.img',
    description: 'Путь к картинке категории',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  picture: string;

  @ForeignKey(() => ProductType)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  @HasMany(() => Products)
  products: Products;

  @BelongsTo(() => ProductType)
  productType: ProductType;

  //   @BelongsToMany(() => ProductBrand, () => TypeBrand)
  //   productBrand: ProductBrand[];
}
