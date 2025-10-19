import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Place } from './places.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Place, (place) => place.user)
  places: Place[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
