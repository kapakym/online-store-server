import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// interface ProductTypeCtreationAttrs {
//   name: string;
// }

@Table({ tableName: 'brand' })
export class Brand extends Model<Brand> {
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
}
