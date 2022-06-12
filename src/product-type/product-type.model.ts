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
import { Products } from 'src/products/products.model';
import { User } from 'src/users/users.model';

interface ProductTypeCtreationAttrs {
  name: string;
}

@Table({ tableName: 'productType' })
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
  product: Products;
}
