import { EntityRepository, Repository } from 'typeorm';
import { Car } from '../entity/car.entity';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async addCar(car: CarInfoDto, user: User): Promise<Car> {
    const newCar = new Car();
    newCar.model = car.model;
    newCar.user = user;

    const saved = await newCar.save();

    return saved;
  }
}
