import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from 'src/dto/create-place.dto';
import { Place } from 'src/entities/places.entity';
import { User } from 'src/entities/user.entity';
import { IPlace } from 'src/interface';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
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

  async createPlace(data: CreatePlaceDto) {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (!user)
      throw new NotFoundException(
        `Usuario con id ${data.userId} no encontrado`,
      );

    // Buscar si el lugar ya existe
    let place = await this.placeRepository.findOne({
      where: { name: data.name },
    });

    if (place) {
      // Si existe, simplemente asociarlo al usuario
      place.user = user;
    } else {
      // Si no existe, crearlo
      place = this.placeRepository.create({
        name: data.name,
        user,
      });
    }

    return this.placeRepository.save(place);
  }
}
