import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ProductTypeCtreationAttrs {
  name: string;
  parentId: number;
  picture: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ProductTypeCtreationAttrs> {
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

  // @ForeignKey(() => ProductType)
  @ApiProperty({
    example: '1',
    description: 'Родитель категории',
  })
  @Column({ type: DataType.INTEGER })
  parentId: number;

  // @HasOne(() => ProductType, { onDelete: 'cascade' })
  // productType: ProductType;
  // @HasMany(() => Products)
  // products: Products;

  // @BelongsTo(() => ProductType)
  // productType: ProductType;

  //   @BelongsToMany(() => ProductBrand, () => TypeBrand)
  //   productBrand: ProductBrand[];
}
