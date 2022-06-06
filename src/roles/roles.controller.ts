import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

// В контроллерах создаютс endpoint, которые вызывают функции обработчики их service
@Controller('roles')
export class RolesController {
  // Инициализация зависимостей для работы с сервисами
  constructor(private roleService: RolesService) {}
  @Post()
  create(@Body() dto: CreateRoleDto) {
    // Вызываем функцию из сервиса и передаем ей параметры
    return this.roleService.createRole(dto);
  }

  // Динаически изменяемый путь
  @Get(`/:value`)
  // Выдергиваем из запроса параметры
  getByValue(@Param(`value`) value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
