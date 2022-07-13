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
import { Basket } from 'src/basket/basket.model';
import { Products } from 'src/products/products.model';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

@Table({ tableName: 'basketProduct' })
export class BasketProduct extends Model<BasketProduct> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER })
  basketId: Number;

  @ForeignKey(() => Products)
  @Column({ type: DataType.INTEGER })
  productsId: Number;

  @BelongsTo(() => Basket)
  basket: Basket;

  @BelongsTo(() => Products)
  products: Products;
}