import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../car/entity/car.entity';

export enum CarStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
}

@Entity()
export class Availability extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({
    type: 'enum',
    enum: CarStatus,
    default: CarStatus.AVAILABLE,
  })
  status: CarStatus;

  @ManyToOne((type) => Car, (car) => car.availabilities)
  @JoinColumn()
  car: Car;
}
