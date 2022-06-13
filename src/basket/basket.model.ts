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
import { BasketProduct } from 'src/basket-product/basket-product.model';
import { Products } from 'src/products/products.model';
import { User } from 'src/users/users.model';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

@Table({ tableName: 'basket' })
export class Basket extends Model<Basket> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: Number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => BasketProduct)
  basketProduct: BasketProduct;
}
