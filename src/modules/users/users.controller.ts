import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { UpdateUserDto } from 'src/dto/upddate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
