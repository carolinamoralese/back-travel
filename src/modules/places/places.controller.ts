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
import { PlacesService } from './places.service';
import type { IPlace } from 'src/interface';
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
import { CreatePlaceDto } from 'src/dto/create-place.dto';

@ApiTags('places')
@ApiBearerAuth()
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Agregar un lugar a un usuario existente' })
  @ApiResponse({ status: 201, description: 'Lugar agregado correctamente' })
  @ApiBody({
    description: 'Datos para crear un lugar asociado a un usuario',
    examples: {
      ejemplo1: {
        value: { name: 'Cartagena', userId: 2 },
      },
    },
  })
  create(@Body() placeData: CreatePlaceDto) {
    return this.placesService.createPlace(placeData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lugares' })
  @ApiResponse({ status: 200, description: 'Lista de lugares' })
  findAll() {
    return this.placesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lugar por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del lugar' })
  @ApiResponse({ status: 200, description: 'Lugar encontrado' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  findOne(@Param('id') id: number) {
    return this.placesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un lugar (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del lugar' })
  @ApiBody({
    description: 'Datos actualizados del lugar',
    examples: {
      ejemplo1: {
        value: {
          name: 'Paris',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Lugar actualizado exitosamente' })
  update(@Param('id') id: number, @Body() updateData: Partial<IPlace>) {
    return this.placesService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lugar (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del lugar' })
  @ApiResponse({ status: 200, description: 'Lugar eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('id') id: number) {
    return this.placesService.remove(id);
  }
}
