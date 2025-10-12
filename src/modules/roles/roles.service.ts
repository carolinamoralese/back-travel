import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { IRole } from 'src/interface';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // Crear un nuevo rol
  async create(roleData: IRole): Promise<Role> {
    const role = this.roleRepository.create(roleData);
    return this.roleRepository.save(role);
  }

  // Listar todos los roles
  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  // Buscar un rol por id
  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Role>): Promise<Role | null> {
    await this.roleRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un rol
  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
