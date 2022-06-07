import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  // Инжектирования сервиса для обработки запросов
  constructor(private authService: AuthService) {}

  // Авторизация пользователя в магазине
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
  // Регистрация ползователя в магазине
  @Post('/registration')
  reistration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
