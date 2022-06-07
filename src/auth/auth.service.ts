import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  // Для создания пользователя инжектируем UserService
  constructor(
    private userSevice: UsersService,
    private jwtService: JwtService,
  ) {}

  // Обработчик авторизация пользователя в магазине
  async login(userDto: CreateUserDto) {}
  // Обработчик регистрация ползователя в магазине
  async registration(userDto: CreateUserDto) {
    // Проверяем, есть ли такоей пользователь в базе
    const candidate = await this.userSevice.getUserByEmail(userDto.email);
    console.log(candidate);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Хешируем пароль для нового пользователя
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    // Создаем пользователя

    const user = await this.userSevice.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generatorToken(user);
  }

  async generatorToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
