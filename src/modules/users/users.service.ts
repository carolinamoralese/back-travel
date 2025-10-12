import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersRepo.find({
      relations: ['places'],
    });
  }
  createUser(neewUser: CreateUserDTO) {
    const userCreate = this.usersRepo.create(neewUser);
    return this.usersRepo.save(userCreate);
  }
}
