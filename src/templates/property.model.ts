import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { GetPropertyByPageDto } from './dto/get-property-by-page.dto';

interface PropertyCreationAttrs {
  name: string;
  type: string;
  templateId: number;
}

@Table({ tableName: 'property' })
export class Property extends Model<Property, GetPropertyByPageDto> {
  @ApiProperty({ example: '1', description: 'Уникальный индетификатор' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  @ApiProperty({
    example: 'Высота (м)',
    description: 'Название свойства и единицы измерения',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @ApiProperty({ example: 'number', description: 'Тип свойства' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: string;
  @ApiProperty({
    example: '1',
    description: 'Id шаблона, которому принадлежит данное свойство',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  templateId: number;
}
