import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
import { BasketProduct } from 'src/basket-product/basket-product.model';
import { ProductBrand } from 'src/product-brand/product-brand.model';
import { ProductProperty } from 'src/product-property/product-property.model';
import { ProductRaiting } from 'src/product-raiting/product-raiting.model';
import { ProductType } from 'src/product-type/product-type.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface ProductsCtreationAttrs {
  name: string;
  price: number;
  raiting: number;
  imageList: string[];
}

@Table({ tableName: 'products' })
export class Products extends Model<Products, ProductsCtreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Елка хвойная',
    description: 'Название товара',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @ApiProperty({ example: '50000', description: 'Стоимость товара' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({
    example: '5',
    description: 'Популярность товара',
  })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  raiting: number;

  @ApiProperty({
    example: '[1.png, 2.png, ...]',
    description: 'Причина блокировки пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  imageList: string[];

  @ForeignKey(() => ProductType)
  @Column({ type: DataType.INTEGER })
  productTypeId: Number;

  @ForeignKey(() => ProductBrand)
  @Column({ type: DataType.INTEGER })
  productBrandId: Number;

  @BelongsTo(() => ProductType)
  productType: ProductType;

  @BelongsTo(() => ProductBrand)
  productBrand: ProductBrand;

  @HasMany(() => ProductRaiting)
  productRaiting: ProductRaiting;

  @HasMany(() => BasketProduct)
  basketProduct: BasketProduct;

  @HasMany(() => ProductProperty)
  productProperty: ProductProperty;
}
