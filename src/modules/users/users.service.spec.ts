import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

// 🔥 MOCKEO COMPLETO DEL MÓDULO BCRYPT
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let usersRepo: jest.Mocked<Repository<User>>;
  let rolesRepo: jest.Mocked<Repository<Role>>;

  beforeEach(async () => {
    const usersRepoMock: Partial<jest.Mocked<Repository<User>>> = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
    };

    const rolesRepoMock: Partial<jest.Mocked<Repository<Role>>> = {
      findOneBy: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepoMock },
        { provide: getRepositoryToken(Role), useValue: rolesRepoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepo = module.get(getRepositoryToken(User));
    rolesRepo = module.get(getRepositoryToken(Role));
  });

  // ----------------------------------------------------
  // FIND ALL
  // ----------------------------------------------------
  describe('findAll', () => {
    it('debe retornar todos los usuarios con relaciones', async () => {
      const users = [{ id: 1, name: 'John' }] as User[];
      usersRepo.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(usersRepo.find).toHaveBeenCalledWith({
        relations: ['places', 'role'],
      });
      expect(result).toEqual(users);
    });
  });

  // ----------------------------------------------------
  // CREATE USER
  // ----------------------------------------------------
  describe('createUser', () => {
    it('debe crear un usuario correctamente', async () => {
      const dto = {
        name: 'Carlos',
        email: 'test@mail.com',
        password: '123456',
        roleId: 1,
      };

      const roleMock = { id: 1, name: 'Admin' } as Role;

      rolesRepo.findOneBy.mockResolvedValue(roleMock);

      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpass');

      usersRepo.create.mockReturnValue({
        ...dto,
        password: 'hashedpass',
        role: roleMock,
      } as User);

      usersRepo.save.mockResolvedValue({
        id: 10,
        ...dto,
        password: 'hashedpass',
        role: roleMock,
      } as User);

      const result = await service.createUser(dto);

      expect(rolesRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 'salt');
      expect(usersRepo.create).toHaveBeenCalled();
      expect(usersRepo.save).toHaveBeenCalled();
      expect(result.id).toBe(10);
    });

    it('debe lanzar NotFoundException si el rol no existe', async () => {
      const dto = {
        name: 'Carlos',
        email: 'mail@mail.com',
        password: '123',
        roleId: 99,
      };

      rolesRepo.findOneBy.mockResolvedValue(null);

      await expect(service.createUser(dto)).rejects.toThrow(NotFoundException);

      expect(usersRepo.create).not.toHaveBeenCalled();
    });
  });

  // ----------------------------------------------------
  // UPDATE
  // ----------------------------------------------------
  describe('update', () => {
    it('debe actualizar un usuario y devolverlo', async () => {
      const updatedUser = {
        id: 1,
        name: 'Updated',
        role: {},
        places: [],
      } as User;

      usersRepo.update.mockResolvedValue(undefined);
      usersRepo.findOne.mockResolvedValue(updatedUser);

      const result = await service.update(1, { name: 'Updated' });

      expect(usersRepo.update).toHaveBeenCalledWith(1, { name: 'Updated' });
      expect(usersRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['role', 'places'],
      });
      expect(result).toEqual(updatedUser);
    });
  });

  // ----------------------------------------------------
  // REMOVE
  // ----------------------------------------------------
  describe('remove', () => {
    it('debe eliminar un usuario', async () => {
      usersRepo.delete.mockResolvedValue(undefined);

      await service.remove(1);

      expect(usersRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  // ----------------------------------------------------
  // FIND BY EMAIL
  // ----------------------------------------------------
  describe('findByEmail', () => {
    it('debe buscar usuario por email', async () => {
      const user = { id: 1, email: 'a@a.com' } as User;

      usersRepo.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('a@a.com');

      expect(usersRepo.findOne).toHaveBeenCalledWith({
        where: { email: 'a@a.com' },
        relations: ['role', 'places'],
      });
      expect(result).toEqual(user);
    });
  });

  // ----------------------------------------------------
  // FIND ROLE BY NAME
  // ----------------------------------------------------
  describe('findRoleByName', () => {
    it('debe buscar un rol por nombre', async () => {
      const role = { id: 1, name: 'Admin' } as Role;

      rolesRepo.findOne.mockResolvedValue(role);

      const result = await service.findRoleByName('Admin');

      expect(rolesRepo.findOne).toHaveBeenCalledWith({
        where: { name: 'Admin' },
      });
      expect(result).toEqual(role);
    });
  });
});
