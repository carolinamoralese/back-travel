import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/entities/places.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
