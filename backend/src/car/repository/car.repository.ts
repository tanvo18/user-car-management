import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { Car } from '../entity/car.entity';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async addCar() {
    Logger.log('addCar');
  }
}
