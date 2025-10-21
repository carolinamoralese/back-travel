import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { UpdateUserDto } from 'src/dto/upddate-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({
    description: 'Datos necesarios para crear un usuario',
    examples: {
      ejemplo1: {
        value: {
          name: 'Juan Pérez',
          email: 'juan@example.com',
          password: '123456',
          roleId: 1,
        },
      },
      ejemplo2: {
        value: {
          name: 'Ana Gómez',
          email: 'ana@example.com',
          password: '123456',
          roleId: 2,
        },
      },
    },
  })
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body);
  }

  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente (solo admin)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  @ApiBody({
    description: 'Datos a actualizar del usuario',
  })
  update(@Param('id') id: number, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario (solo admin)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario a eliminar',
  })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  getProfile() {
    return this.usersService.findAll();
  }
}
