import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BannedUserDto } from './dto/banned-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './users.model';

import { UsersService } from './users.service';
import { UserByPageDto } from './dto/get-user-by-page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: DeleteUserDto })
  // @UsePipes(ValidationPipe)
  @Post('/delete')
  delete(@Body() userDto: DeleteUserDto) {
    return this.usersService.deleteUser(userDto);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary:
      'Получение определенного количества пользователей на определенной странице',
  })
  @ApiResponse({ status: 200, type: UserByPageDto })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/page')
  getUsersByPage(@Query() dto: UserByPageDto) {
    return this.usersService.getUserByPage(dto);
  }

  @ApiOperation({ summary: 'Назначить права' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({
    summary: 'Заблокировать/разблокировать пользователя пользователя',
  })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BannedUserDto) {
    return this.usersService.banUser(dto);
  }
}
