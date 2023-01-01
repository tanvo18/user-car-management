import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @ManyToOne((type) => User, (user) => user.cars, { onDelete: 'CASCADE' })
  @JoinTable()
  user: User;

  @OneToMany((type) => Availability, (availability) => availability.car, {
    cascade: ['insert'],
  })
  @JoinColumn()
  availabilities: Availability[];
}
