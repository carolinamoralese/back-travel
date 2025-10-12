import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import type { IPlace } from 'src/interface';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() placeData: IPlace) {
    return this.placesService.create(placeData);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.placesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<IPlace>) {
    return this.placesService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.placesService.remove(id);
  }
}
