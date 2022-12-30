import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Availability } from '../../availability/entity/availability.entity';

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  model: string;

  @ManyToOne((type) => User, (user) => user.cars)
  @JoinColumn()
  user: User;

  @OneToMany((type) => Availability, (availability) => availability.car, {
    cascade: true,
  })
  @JoinColumn()
  availabilities: Availability[];
}
