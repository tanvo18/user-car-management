import { User } from 'src/user/entity/user.entity';
import {
  Availability,
  CarStatus,
} from 'src/availability/entity/availability.entity';

export interface CarInfoData {
  model: string;
  user: User;
  availability: Availability;
}

export interface CarAvailability {
  date: Date;
  price: number;
  status: CarStatus;
}
