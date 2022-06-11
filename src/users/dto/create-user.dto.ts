import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.ru', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Не верный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
