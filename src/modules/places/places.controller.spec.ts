import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

describe('PlacesController', () => {
  let controller: PlacesController;
  let service: PlacesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [{ provide: PlacesService, useValue: mockService }],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    service = module.get<PlacesService>(PlacesService);
  });

  it('findAll → debe llamar al servicio', async () => {
    mockService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('findOne → debe devolver un lugar', async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne('1');

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
