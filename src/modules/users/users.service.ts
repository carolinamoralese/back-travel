import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async createUser(newUser: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const user = this.usersRepo.create({
      ...newUser,
      password: hashedPassword,
    });
    return this.usersRepo.save(user);
  }
}
