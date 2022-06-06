import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.ru', description: 'Имя пользователя' })
  readonly email: string;
  @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
  readonly password: string;
}
