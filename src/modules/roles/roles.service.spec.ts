import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

describe('RolesService', () => {
  let service: RolesService;
  let repository: jest.Mocked<Repository<Role>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Role>>> = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(Role), useValue: repoMock },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repository = module.get(getRepositoryToken(Role));
  });

  // ----------------------------------------------------
  // CREATE
  // ----------------------------------------------------
  describe('create', () => {
    it('debe crear y guardar un rol', async () => {
      const dto = { name: 'admin' };

      repository.create.mockReturnValue(dto as Role);
      repository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, name: 'admin' });
    });
  });

  // ----------------------------------------------------
  // FIND ALL
  // ----------------------------------------------------
  describe('findAll', () => {
    it('debe retornar todos los roles', async () => {
      const roles = [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' },
      ];

      repository.find.mockResolvedValue(roles as Role[]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(roles);
    });
  });

  // ----------------------------------------------------
  // FIND ONE
  // ----------------------------------------------------
  describe('findOne', () => {
    it('debe retornar un rol por id', async () => {
      const role = { id: 1, name: 'admin' };
      repository.findOneBy.mockResolvedValue(role as Role);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(role);
    });

    it('debe retornar null si no existe', async () => {
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  // ----------------------------------------------------
  // UPDATE
  // ----------------------------------------------------
  describe('update', () => {
    it('debe actualizar y retornar el rol actualizado', async () => {
      const updatedRole = { id: 1, name: 'super-admin' };

      repository.update.mockResolvedValue(undefined);
      repository.findOneBy.mockResolvedValue(updatedRole as Role);

      const result = await service.update(1, { name: 'super-admin' });

      expect(repository.update).toHaveBeenCalledWith(1, {
        name: 'super-admin',
      });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(updatedRole);
    });

    it('debe retornar null si no lo encuentra después de actualizar', async () => {
      repository.update.mockResolvedValue(undefined);
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.update(1, { name: 'x' });

      expect(result).toBeNull();
    });
  });

  // ----------------------------------------------------
  // REMOVE
  // ----------------------------------------------------
  describe('remove', () => {
    it('debe eliminar el rol por id', async () => {
      repository.delete.mockResolvedValue(undefined);

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
