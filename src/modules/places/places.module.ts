import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/entities/places.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, User])],
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
