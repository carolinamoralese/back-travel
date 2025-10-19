import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,

    @InjectRepository(Role)
    private rolesRepo: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find({
      relations: ['places', 'role'],
    });
  }

  async createUser(newUser: CreateUserDTO) {
    // Buscar el rol en la base de datos
    const role = await this.rolesRepo.findOneBy({ id: newUser.roleId });
    if (!role) {
      throw new NotFoundException(`El rol con id ${newUser.roleId} no existe`);
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    // Crear y guardar el usuario
    const user = this.usersRepo.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      role,
    });

    return this.usersRepo.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    await this.usersRepo.update(id, data);
    return this.usersRepo.findOne({
      where: { id },
      relations: ['role', 'places'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }
}
