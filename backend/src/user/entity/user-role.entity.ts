import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Role } from '../../enums/role';
import { User } from './user.entity';

@Entity()
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  roleName: Role;

  @ManyToOne((type) => User, (user) => user.roles)
  @JoinColumn()
  user: User;
}
