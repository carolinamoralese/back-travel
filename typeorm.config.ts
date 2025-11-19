import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Role } from './src/entities/role.entity';
import { Place } from './src/entities/places.entity';
dotenv.config();

export default new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [User, Role, Place],
  migrations: ['./src/migrations/*.ts'],
  synchronize: true,
});
