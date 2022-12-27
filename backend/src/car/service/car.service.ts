import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarRepository } from '../repository/car.repository';
import { CarInfoDto } from '../dto/car-info.dto';
import { CarInfoData } from 'src/interfaces/car-info.interface';
import { User } from 'src/user/entity/user.entity';
import { Car } from '../entity/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository)
    private carRepository: CarRepository,
  ) {}

  async addCar(car: CarInfoDto, user: User): Promise<Car> {
    return await this.carRepository.addCar(car, user);
  }
}
