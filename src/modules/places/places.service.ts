import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/entities/places.entity';
import { IPlace } from 'src/interface';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async create(placeData: IPlace): Promise<Place> {
    const place = this.placeRepository.create(placeData);
    return this.placeRepository.save(place);
  }

  async findAll(): Promise<Place[]> {
    return this.placeRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Place | null> {
    return this.placeRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Place>): Promise<Place | null> {
    await this.placeRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.placeRepository.delete(id);
  }
}
