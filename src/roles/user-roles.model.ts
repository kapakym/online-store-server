import { ApiProperty } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';

interface RoleCtreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'userroles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
