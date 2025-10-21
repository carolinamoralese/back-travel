import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import type { IRole } from 'src/interface';
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

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol (solo admin)' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiBody({
    description: 'Datos del rol a crear',
    examples: {
      ejemplo1: {
        value: {
          name: 'admin',
          description: 'Administrador con acceso total',
        },
      },
      ejemplo2: {
        value: {
          name: 'travel_agent',
          description: 'Agente que puede gestionar viajes',
        },
      },
    },
  })
  create(@Body() roleData: IRole) {
    return this.rolesService.create(roleData);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los roles (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida correctamente',
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rol a buscar' })
  @ApiResponse({ status: 200, description: 'Rol encontrado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol existente (solo admin)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del rol a actualizar',
  })
  @ApiBody({
    description: 'Datos del rol a actualizar',
    examples: {
      ejemplo1: {
        value: {
          name: 'travel_agent',
          description: 'Agente que puede crear y ver lugares',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente' })
  update(@Param('id') id: number, @Body() updateData: Partial<IRole>) {
    return this.rolesService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rol a eliminar' })
  @ApiResponse({ status: 200, description: 'Rol eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}
