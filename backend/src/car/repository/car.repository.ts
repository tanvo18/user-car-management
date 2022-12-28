import { EntityRepository, Repository } from 'typeorm';
import { Car } from '../entity/car.entity';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';
import { Availability } from 'src/availability/entity/availability.entity';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async addCar(car: CarInfoDto, user: User): Promise<Car> {
    const newCar = new Car();
    newCar.model = car.model;
    newCar.user = user;

    const saved = await newCar.save();

    return saved;
  }

  async setAvailability(
    id: number,
    availability: Availability,
  ): Promise<Car | null> {
    const car = await this.findOne({
      where: { id },
      relations: ['availabilities'],
    });

    if (!car) {
      return null;
    }

    const existingAvailability: Availability = car.availabilities.find(
      (existingAvailability) => existingAvailability.date === availability.date,
    );

    // NOTE: we have 2 cases:
    // 1. If availability existed => update record
    // 2. If availability is new => create a new record
    if (existingAvailability) {
      for (const key in availability) {
        existingAvailability[key] = availability[key];
      }
    } else {
      car.availabilities.push(availability);
    }

    return await car.save();
  }
}
