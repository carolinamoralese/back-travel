import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlacesService } from './places.service';
import { Place } from 'src/entities/places.entity';
import { User } from 'src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('PlacesService', () => {
  let service: PlacesService;
  let placeRepo: jest.Mocked<Repository<Place>>;
  let userRepo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    placeRepo = module.get(getRepositoryToken(Place));
    userRepo = module.get(getRepositoryToken(User));
  });

  // ---------------------------------------------------------
  // create()
  // ---------------------------------------------------------
  it('debería crear un lugar', async () => {
    const data = { name: 'Bogotá' } as Place;

    placeRepo.create.mockReturnValue(data);
    placeRepo.save.mockResolvedValue({ id: 1, ...data });

    const result = await service.create(data);

    expect(placeRepo.create).toHaveBeenCalledWith(data);
    expect(placeRepo.save).toHaveBeenCalledWith(data);
    expect(result).toEqual({ id: 1, name: 'Bogotá' });
  });

  // ---------------------------------------------------------
  // findAll()
  // ---------------------------------------------------------
  it('debería retornar todos los lugares con relación user', async () => {
    const places = [{ id: 1, name: 'Medellín' }];
    placeRepo.find.mockResolvedValue(places as any);

    const result = await service.findAll();

    expect(placeRepo.find).toHaveBeenCalledWith({ relations: ['user'] });
    expect(result).toBe(places);
  });

  // ---------------------------------------------------------
  // findOne()
  // ---------------------------------------------------------
  it('debería retornar un lugar por id', async () => {
    const place = { id: 1, name: 'Cali' } as Place;

    placeRepo.findOne.mockResolvedValue(place);

    const result = await service.findOne(1);

    expect(placeRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toBe(place);
  });

  // ---------------------------------------------------------
  // update()
  // ---------------------------------------------------------
  it('debería actualizar un lugar y retornar el actualizado', async () => {
    const updated = { id: 1, name: 'Cartagena' } as Place;

    placeRepo.update.mockResolvedValue(undefined);
    placeRepo.findOne.mockResolvedValue(updated);

    const result = await service.update(1, { name: 'Cartagena' });

    expect(placeRepo.update).toHaveBeenCalledWith(1, { name: 'Cartagena' });
    expect(result).toBe(updated);
  });

  // ---------------------------------------------------------
  // remove()
  // ---------------------------------------------------------
  it('debería eliminar un lugar', async () => {
    placeRepo.delete.mockResolvedValue({ affected: 1 } as any);

    await service.remove(1);

    expect(placeRepo.delete).toHaveBeenCalledWith(1);
  });

  // ---------------------------------------------------------
  // createPlace()
  // ---------------------------------------------------------
  it('debería lanzar error si el usuario no existe', async () => {
    userRepo.findOne.mockResolvedValue(null);

    await expect(
      service.createPlace({ name: 'Manizales', userId: 99 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('debería asociar un lugar existente a un usuario', async () => {
    const user = { id: 1, name: 'Juan' } as User;
    const existingPlace = { id: 10, name: 'Barranquilla' } as Place;

    userRepo.findOne.mockResolvedValue(user);
    placeRepo.findOne.mockResolvedValue(existingPlace);
    placeRepo.save.mockResolvedValue({ ...existingPlace, user });

    const result = await service.createPlace({
      name: 'Barranquilla',
      userId: 1,
    });

    expect(placeRepo.findOne).toHaveBeenCalledWith({
      where: { name: 'Barranquilla' },
    });

    expect(placeRepo.save).toHaveBeenCalledWith({
      ...existingPlace,
      user,
    });

    expect(result).toEqual({ ...existingPlace, user });
  });

  it('debería crear un lugar si no existe y asignarlo al usuario', async () => {
    const user = { id: 1, name: 'Pedro' } as User;

    userRepo.findOne.mockResolvedValue(user);
    placeRepo.findOne.mockResolvedValue(null);

    const created = { id: 20, name: 'Tunja', user } as Place;

    placeRepo.create.mockReturnValue({ name: 'Tunja', user } as Place);
    placeRepo.save.mockResolvedValue(created);

    const result = await service.createPlace({
      name: 'Tunja',
      userId: 1,
    });

    expect(placeRepo.create).toHaveBeenCalledWith({
      name: 'Tunja',
      user,
    });

    expect(placeRepo.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(created);
  });
});
