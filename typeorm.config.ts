import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.BD_HOST,
  port: Number(process.env.BD_PORT),
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  entities: [User],
  migrations: ['./src/migrations/*.ts'],
  synchronize: true,
});
