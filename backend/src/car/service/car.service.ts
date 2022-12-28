import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarRepository } from '../repository/car.repository';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';
import { Car } from '../entity/car.entity';
import { Availability } from 'src/availability/entity/availability.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository)
    private carRepository: CarRepository,
  ) {}

  async addCar(car: CarInfoDto, user: User): Promise<Car> {
    return await this.carRepository.addCar(car, user);
  }

  async setAvailability(
    id: number,
    availability: Availability,
  ): Promise<Car | null> {
    const result = await this.carRepository.setAvailability(id, availability);

    return result;
  }
}
