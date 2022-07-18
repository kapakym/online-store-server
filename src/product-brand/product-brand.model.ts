import { ApiProperty } from '@nestjs/swagger';
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
import { ProductType } from 'src/product-type/product-type.model';
import { TypeBrand } from 'src/product-type/type-brand.model';
import { Products } from 'src/products/products.model';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

@Table({ tableName: 'product_brand' })
export class ProductBrand extends Model<ProductBrand> {
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
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '/picture.jpg',
    description: 'Лейбл производителя',
  })
  @Column({ type: DataType.STRING })
  picture: string;

  @HasMany(() => Products)
  products: Products;
}
