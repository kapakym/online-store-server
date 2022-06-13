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
import { Products } from 'src/products/products.model';
import { User } from 'src/users/users.model';

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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: Number;

  @ForeignKey(() => Products)
  @Column({ type: DataType.INTEGER })
  productsId: Number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Products)
  products: Products;
}
