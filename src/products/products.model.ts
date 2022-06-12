import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
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
  @Column({ type: DataType.INTEGER, defaultValue: false })
  raiting: number;

  @ApiProperty({
    example: '[1.png, 2.png, ...]',
    description: 'Причина блокировки пользователя',
  })
  @Column({ type: DataType.ARRAY, allowNull: true })
  imageList: string[];

  @BelongsTo(() => ProductType)
  productType: ProductType;
}
